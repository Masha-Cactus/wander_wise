'use server';

import { cookies } from 'next/headers';

export async function saveCookies({token, userId}
: {token: string, userId: number}) {
  cookies().set('token', token, { httpOnly: true });
  cookies().set('userId', userId.toString(), { httpOnly: true });
}

export async function saveUserToCookies(userId: number) {
  cookies().set('userId', userId.toString(), { httpOnly: true }); 
}

export async function saveTokenToCookies(token: string) {
  cookies().set('token', token, { httpOnly: true }); 
}

export async function getUserIdFromCookies()
: Promise<number | null> {
  const userId = cookies().get('userId')?.value;

  return userId ? +userId : null;
}

export async function clearCookies() {
  cookies().delete('userId');
  cookies().delete('token');
}