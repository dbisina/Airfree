import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { redis } from '@/lib/redis';
import { isAuthenticated } from '@/lib/auth-util';

const KEY = 'airfree:newsletter';

function buildEmailHtml(bodyHtml: string, subject: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${subject.replace(/</g, '&lt;')}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f2;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f2;padding:36px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;">
      <tr>
        <td style="background:#0A1628;padding:22px 36px;">
          <p style="margin:0;font-family:monospace;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#ffffff;font-weight:700;">
            Airfree Geospatial
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:36px 36px 28px;">
          <div style="font-family:Georgia,serif;font-size:15px;line-height:1.8;color:#1a1a1a;max-width:100%;">
            ${bodyHtml}
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:20px 36px 28px;border-top:1px solid #eaeae8;background:#f8f8f7;">
          <p style="margin:0 0 8px;font-family:monospace;font-size:10px;color:#888;letter-spacing:0.12em;line-height:1.6;">
            Airfree Geospatial Pty Ltd &nbsp;·&nbsp; ABN 698 093 239<br>
            Adelaide &nbsp;·&nbsp; Perth &nbsp;·&nbsp; Melbourne &nbsp;·&nbsp; Australia
          </p>
          <p style="margin:0;font-family:monospace;font-size:10px;color:#bbb;letter-spacing:0.08em;">
            You received this because you subscribed at airfreegroup.com.au
          </p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { subject, html } = (await req.json()) as { subject: string; html: string };

    if (!subject?.trim() || !html?.trim() || html.trim() === '<p></p>') {
      return NextResponse.json({ ok: false, error: 'Subject and email body are required.' }, { status: 400 });
    }

    // Fetch all subscribers
    const raw = await redis.lrange(KEY, 0, -1);
    const subscribers = (raw as unknown[]).map(r => {
      try { return typeof r === 'string' ? JSON.parse(r) : r; } catch { return null; }
    }).filter(Boolean) as { email: string; subscribedAt: string }[];

    if (subscribers.length === 0) {
      return NextResponse.json({ ok: false, error: 'No subscribers found.' }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST ?? 'ventraip.email';
    const smtpPort = parseInt(process.env.NEWSLETTER_SMTP_PORT ?? process.env.SMTP_PORT ?? '465', 10);
    const smtpUser = process.env.NEWSLETTER_SMTP_USER;
    const smtpPass = process.env.NEWSLETTER_SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      return NextResponse.json(
        { ok: false, error: 'Newsletter SMTP not configured. Add NEWSLETTER_SMTP_USER and NEWSLETTER_SMTP_PASS to .env.local' },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    const finalHtml = buildEmailHtml(html, subject);

    let sent = 0;
    let failed = 0;
    const failedEmails: string[] = [];

    for (const sub of subscribers) {
      try {
        await transporter.sendMail({
          from: `"Airfree Geospatial" <${smtpUser}>`,
          to: sub.email,
          subject,
          html: finalHtml,
        });
        sent++;
      } catch (err) {
        failed++;
        if (failedEmails.length < 10) {
          failedEmails.push(sub.email);
        }
      }
    }

    // Log send record to Redis (full content preserved)
    await redis.lpush('airfree:newsletter:sent', JSON.stringify({
      subject,
      html,
      sentAt: new Date().toISOString(),
      sent,
      failed,
      total: subscribers.length,
    }));
    await redis.ltrim('airfree:newsletter:sent', 0, 99);

    return NextResponse.json({ ok: true, sent, failed, total: subscribers.length, failedEmails });
  } catch (err) {
    console.error('[newsletter/send]', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
