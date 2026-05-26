import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { redis } from '@/lib/redis';
import { cookies } from 'next/headers';

// ── Env config ────────────────────────────────────────────────────────────────
// Set these in .env.local:
//   SMTP_HOST=smtp.gmail.com          (or your provider)
//   SMTP_PORT=587                     (587 = TLS, 465 = SSL, 25 = plain)
//   SMTP_USER=you@yourdomain.com
//   SMTP_PASS=your_app_password       (Gmail: use App Password, not account password)
//   CONTACT_TO_EMAIL=info@airfreegeospatial.com.au  (defaults to SMTP_USER)

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT ?? '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error('SMTP_HOST, SMTP_USER and SMTP_PASS must be set in .env.local');
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

// ── POST /api/contact ─────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      name: string;
      organisation: string;
      email: string;
      service: string;
      message: string;
    };

    const { name, organisation, email, service, message } = body;

    // Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { ok: false, error: 'Name, email and message are required.' },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid email address.' },
        { status: 400 },
      );
    }

    // Save to Redis (robust storage backup)
    let savedToRedis = false;
    try {
      const submission = {
        id: crypto.randomUUID(),
        name,
        organisation: organisation || '',
        email,
        service: service || 'General Enquiry',
        message,
        timestamp: new Date().toISOString(),
      };
      await redis.lpush('airfree:submissions', JSON.stringify(submission));
      // Keep last 100 entries
      await redis.ltrim('airfree:submissions', 0, 99);
      savedToRedis = true;
    } catch (redisErr) {
      console.error('[contact] Redis store failed:', redisErr);
    }

    try {
      const to = process.env.CONTACT_TO_EMAIL ?? process.env.SMTP_USER ?? '';
      const transporter = getTransporter();

      // ── Send notification to Airfree ───────────────────────────────────────
      await transporter.sendMail({
        from: `"Airfree Contact Form" <${process.env.SMTP_USER}>`,
        to,
        replyTo: `"${name}" <${email}>`,
        subject: `New Enquiry — ${service || 'General Enquiry'} — ${name}`,
        text: [
          `Name:          ${name}`,
          `Organisation:  ${organisation || '—'}`,
          `Email:         ${email}`,
          `Service:       ${service || '—'}`,
          '',
          'Message:',
          message,
        ].join('\n'),
        html: `
          <div style="font-family:monospace;max-width:600px;background:#f8f8f7;padding:32px;border-left:4px solid #4A86B8">
            <h2 style="font-family:Georgia,serif;margin:0 0 24px;color:#0A1628;font-size:20px">
              New Project Enquiry — Airfree Geospatial
            </h2>
            <table style="width:100%;border-collapse:collapse;font-size:13px;color:#333">
              <tr><td style="padding:8px 16px 8px 0;color:#666;white-space:nowrap;vertical-align:top">NAME</td><td style="padding:8px 0;font-weight:bold">${name}</td></tr>
              <tr><td style="padding:8px 16px 8px 0;color:#666;white-space:nowrap;vertical-align:top">ORGANISATION</td><td style="padding:8px 0">${organisation || '—'}</td></tr>
              <tr><td style="padding:8px 16px 8px 0;color:#666;white-space:nowrap;vertical-align:top">EMAIL</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#4A86B8">${email}</a></td></tr>
              <tr><td style="padding:8px 16px 8px 0;color:#666;white-space:nowrap;vertical-align:top">SERVICE</td><td style="padding:8px 0">${service || '—'}</td></tr>
            </table>
            <div style="margin-top:24px;padding-top:24px;border-top:1px solid #e0e0e0">
              <p style="color:#666;font-size:12px;margin:0 0 8px">MESSAGE</p>
              <p style="white-space:pre-wrap;margin:0;line-height:1.6">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            </div>
            <p style="margin-top:32px;font-size:11px;color:#999">
              Sent via airfreegeospatial.com.au contact form · Reply directly to this email to respond to ${name}
            </p>
          </div>
        `,
      });

      // ── Send confirmation to sender ────────────────────────────────────────
      await transporter.sendMail({
        from: `"Airfree Geospatial" <${process.env.SMTP_USER}>`,
        to: `"${name}" <${email}>`,
        subject: 'We received your enquiry — Airfree Geospatial',
        text: [
          `Hi ${name},`,
          '',
          'Thank you for your enquiry. We have received your message and will respond within two business days.',
          '',
          `Your enquiry reference: ${service || 'General Enquiry'}`,
          '',
          'Airfree Geospatial Pty Ltd',
          'airfreegeospatial.com.au',
        ].join('\n'),
        html: `
          <div style="font-family:Georgia,serif;max-width:600px;padding:32px;background:#ffffff;border-top:4px solid #4A86B8">
            <h2 style="font-size:20px;color:#0A1628;margin:0 0 16px">Thank you, ${name}</h2>
            <p style="font-family:sans-serif;font-size:14px;color:#444;line-height:1.7;margin:0 0 12px">
              We have received your enquiry regarding <strong>${service || 'our services'}</strong>
              and will respond within two business days.
            </p>
            <p style="font-family:sans-serif;font-size:14px;color:#444;line-height:1.7;margin:0 0 32px">
              If your matter is time-sensitive, please call us directly.
            </p>
            <hr style="border:none;border-top:1px solid #eee;margin:0 0 24px">
            <p style="font-family:monospace;font-size:11px;color:#888;margin:0">
              Airfree Geospatial Pty Ltd · ABN 698 093 239<br>
              Adelaide · Perth · Melbourne · Australia
            </p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error('[contact] SMTP send failed:', emailErr);
      if (savedToRedis) {
        // If saved to Redis, return success since we successfully stored the enquiry!
        return NextResponse.json({ ok: true, note: 'Saved in database' });
      }
      throw emailErr;
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] POST handler failed:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    const safe = message.includes('SMTP_') || message.includes('must be set')
      ? 'Email service not configured. Please contact us directly.'
      : 'Failed to send message. Please try again or email us directly.';
    return NextResponse.json({ ok: false, error: safe }, { status: 500 });
  }
}

// ── GET /api/contact ──────────────────────────────────────────────────────────

export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('airfree_admin_session')?.value;
    if (session !== 'authorized') {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }

    const items = await redis.lrange('airfree:submissions', 0, -1);
    const submissions = items.map(item => {
      try {
        return typeof item === 'string' ? JSON.parse(item) : item;
      } catch (e) {
        return null;
      }
    }).filter(Boolean);

    return NextResponse.json({ ok: true, submissions });
  } catch (err) {
    console.error('[contact] GET handler failed:', err);
    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
