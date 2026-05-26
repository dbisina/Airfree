import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { cookies } from 'next/headers';

const KEY = 'airfree:newsletter';

// POST /api/newsletter — subscribe an email
export async function POST(req: NextRequest) {
  try {
    const { email } = (await req.json()) as { email?: string };
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: 'Valid email required.' }, { status: 400 });
    }

    // Check duplicate
    const existing = await redis.lrange(KEY, 0, -1);
    const emails = existing.map(e => {
      try { const obj = typeof e === 'string' ? JSON.parse(e) : e; return obj?.email ?? ''; }
      catch { return ''; }
    });
    if (emails.includes(email.toLowerCase())) {
      return NextResponse.json({ ok: true, note: 'already_subscribed' });
    }

    await redis.lpush(KEY, JSON.stringify({
      email: email.toLowerCase(),
      subscribedAt: new Date().toISOString(),
    }));
    await redis.ltrim(KEY, 0, 999); // keep last 1000

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[newsletter]', err);
    return NextResponse.json({ ok: false, error: 'Failed to subscribe.' }, { status: 500 });
  }
}

// GET /api/newsletter — admin only: list subscribers
export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('airfree_admin_session')?.value;
    if (session !== 'authorized') {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
    }
    const raw = await redis.lrange(KEY, 0, -1);
    const subscribers = raw.map(r => {
      try { return typeof r === 'string' ? JSON.parse(r) : r; } catch { return null; }
    }).filter(Boolean);
    return NextResponse.json({ ok: true, subscribers, total: subscribers.length });
  } catch (err) {
    console.error('[newsletter GET]', err);
    return NextResponse.json({ ok: false, error: 'Failed to fetch.' }, { status: 500 });
  }
}
