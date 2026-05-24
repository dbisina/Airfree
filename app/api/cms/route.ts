import { NextResponse } from 'next/server';
import { redis, CMS_LIVE_KEY, CMS_HISTORY_KEY, MAX_HISTORY } from '@/lib/redis';
import { CMS_DEFAULTS, CMSContent } from '@/lib/cms-store';

import { isAuthenticated } from '@/lib/auth-util';

// GET — return live content
export async function GET() {
  try {
    const data = await redis.get<CMSContent>(CMS_LIVE_KEY);
    return NextResponse.json(data ?? CMS_DEFAULTS);
  } catch {
    return NextResponse.json(CMS_DEFAULTS);
  }
}

// POST — save new version
export async function POST(req: Request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const body = (await req.json()) as CMSContent;
    const timestamp = Date.now();
    const entry = JSON.stringify({
      timestamp,
      label: new Date(timestamp).toLocaleString('en-AU'),
      data: body,
    });

    // Save live
    await redis.set(CMS_LIVE_KEY, body);

    // Archive to history (sorted set, score = timestamp)
    await redis.zadd(CMS_HISTORY_KEY, { score: timestamp, member: entry });

    // Trim to last MAX_HISTORY versions
    await redis.zremrangebyrank(CMS_HISTORY_KEY, 0, -(MAX_HISTORY + 1));

    return NextResponse.json({ ok: true, timestamp });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
