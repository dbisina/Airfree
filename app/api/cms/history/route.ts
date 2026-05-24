import { NextResponse } from 'next/server';
import { redis, CMS_HISTORY_KEY } from '@/lib/redis';
import { CMSContent } from '@/lib/cms-store';

import { isAuthenticated } from '@/lib/auth-util';

export interface HistoryEntry {
  timestamp: number;
  label: string;
  data: CMSContent;
}

export async function GET() {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    // Get all members, newest first
    const raw = await redis.zrange(CMS_HISTORY_KEY, 0, -1, { rev: true, withScores: true });

    const entries: HistoryEntry[] = [];

    if (Array.isArray(raw)) {
      // Handle both formats Upstash might return:
      // - Interleaved [member, score, member, score, ...]
      // - Array of { member, score } objects
      for (let i = 0; i < raw.length; i++) {
        const item = raw[i];
        if (typeof item === 'string') {
          try {
            entries.push(JSON.parse(item) as HistoryEntry);
          } catch { /* skip malformed entries */ }
        } else if (item && typeof item === 'object' && 'member' in item) {
          try {
            entries.push(JSON.parse((item as { member: string }).member) as HistoryEntry);
          } catch { /* skip malformed entries */ }
        }
      }
    }

    return NextResponse.json(entries);
  } catch {
    return NextResponse.json([]);
  }
}
