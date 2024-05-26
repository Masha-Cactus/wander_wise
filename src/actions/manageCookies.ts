'use server';

import { cookies } from 'next/headers';

export async function saveCookies({token, userId}
: {token: string, userId: number}) {
  cookies().set('token', token);
  cookies().set('userId', userId.toString());
}

export async function saveUserToCookies(userId: number) {
  cookies().set('userId', userId.toString()); 
}

export async function saveTokenToCookies(token: string) {
  cookies().set('token', token); 
}

export async function getUserIdFromCookies()
: Promise<number | null> {
  const userId = cookies().get('userId')?.value;

  return userId ? +userId : null;
}

export async function getUserDataFromCookies()
: Promise<{token: string, userId: number} | null> {
  const userId = cookies().get('userId')?.value;
  const token = cookies().get('token')?.value;

  return (userId && token) 
    ? {userId: +userId, token} 
    : null;
}

export async function clearCookies() {
  cookies().delete('userId');
  cookies().delete('token');
}