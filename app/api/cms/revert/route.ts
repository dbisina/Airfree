import { NextResponse } from 'next/server';
import { redis, CMS_LIVE_KEY, CMS_HISTORY_KEY, MAX_HISTORY } from '@/lib/redis';
import { CMSContent } from '@/lib/cms-store';

import { isAuthenticated } from '@/lib/auth-util';

export async function POST(req: Request) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { timestamp } = (await req.json()) as { timestamp: number };

    // Find the entry with this timestamp in history
    const all = await redis.zrange(CMS_HISTORY_KEY, 0, -1);
    let found: CMSContent | null = null;

    for (const item of all) {
      try {
        const entry = JSON.parse(
          typeof item === 'string' ? item : JSON.stringify(item),
        ) as { timestamp: number; data: CMSContent };
        if (entry.timestamp === timestamp) {
          found = entry.data;
          break;
        }
      } catch { /* skip malformed entries */ }
    }

    if (!found) {
      return NextResponse.json({ ok: false, error: 'Version not found' }, { status: 404 });
    }

    // Save as new live version (also adds a new history entry)
    const newTimestamp = Date.now();
    const entry = JSON.stringify({
      timestamp: newTimestamp,
      label: `Reverted to ${new Date(timestamp).toLocaleString('en-AU')}`,
      data: found,
    });

    await redis.set(CMS_LIVE_KEY, found);
    await redis.zadd(CMS_HISTORY_KEY, { score: newTimestamp, member: entry });
    await redis.zremrangebyrank(CMS_HISTORY_KEY, 0, -(MAX_HISTORY + 1));

    return NextResponse.json({ ok: true, data: found });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
