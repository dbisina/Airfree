import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/auth-util';

export async function POST(req: NextRequest) {
  if (!await isAuthenticated()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const file = form.get('file') as File | null;

    if (!file || !file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Image file required.' }, { status: 400 });
    }

    // 10 MB limit
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image must be under 10 MB.' }, { status: 400 });
    }

    const ext = file.name.split('.').pop() ?? 'jpg';
    const filename = `newsletter/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const blob = await put(filename, file, {
      access: 'public',
      contentType: file.type,
    });

    return NextResponse.json({ ok: true, url: blob.url });
  } catch (err) {
    console.error('[upload]', err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
