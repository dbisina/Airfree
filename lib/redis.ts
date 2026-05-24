// Run: npm install @upstash/redis
// Add to .env.local:
//   UPSTASH_REDIS_REST_URL=your_url_here
//   UPSTASH_REDIS_REST_TOKEN=your_token_here
// Get free Redis at: https://upstash.com

import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const CMS_LIVE_KEY = 'airfree:cms:live';
export const CMS_HISTORY_KEY = 'airfree:cms:history';
export const MAX_HISTORY = 20;
