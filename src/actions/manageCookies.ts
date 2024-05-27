'use server';

import { cookies } from 'next/headers';

export async function saveCookies({token, userId, confirmationCode}
: {token?: string, userId?: number, confirmationCode?: string}) {
  if (token) {
    cookies().set('token', token);
  }

  if (userId) {
    cookies().set('userId', userId.toString());
  }

  if (confirmationCode) {
    cookies().set('confirmationCode', confirmationCode);
  }
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