import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    const expected = process.env.ADMIN_PASSWORD || 'airfree2026';

    if (password === expected) {
      const cookieStore = await cookies();
      cookieStore.set('airfree_admin_session', 'authorized', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: false, error: 'Invalid password' }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
