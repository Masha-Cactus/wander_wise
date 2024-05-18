'use server';

import { ISignInResponse, IUser } from "../services";
import { cookies } from 'next/headers';

export async function saveCookies({token, user}: ISignInResponse) {
  cookies().set('token', token, { httpOnly: true });
  cookies().set('user', JSON.stringify(user), { httpOnly: true });
}

export async function getUserDataFromCookies()
: Promise<{token: string, user: IUser} | null> {
  const user = cookies().get('user')?.value;
  const token = cookies().get('token')?.value;

  return user && token 
    ? {
      user: JSON.parse(user),
      token,
    }
    : null;
}

export async function clearCookies() {
  cookies().delete('user');
  cookies().delete('token');
}