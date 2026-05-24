import { NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth-util';

export async function GET() {
  const authenticated = await isAuthenticated();
  return NextResponse.json({ authenticated });
}
