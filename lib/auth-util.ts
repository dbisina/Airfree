import { cookies } from 'next/headers';

export async function isAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get('airfree_admin_session');
    return session?.value === 'authorized';
  } catch {
    return false;
  }
}
