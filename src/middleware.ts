import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/profile', '/saved', '/my-cards'];

export async function middleware(request: NextRequest) {
  
  const { pathname } = request.nextUrl;
  const isAuthorized = cookies().get('token')?.value;
  const isProtected = protectedRoutes.some(
    route => pathname.startsWith(route));

  if (isProtected && !isAuthorized) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}