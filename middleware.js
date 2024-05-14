import Cookies from 'js-cookie';
import { NextResponse } from 'next/server';

export function middleware(request) {
  const verify = Cookies.get('isLoggedIn');
  if (verify === 'true') {
    return NextResponse.redirect('http://localhost:3000/messenger');
  } else {
    return NextResponse.redirect('http://localhost:3000/login');
  }
}

export const config = {
  matcher: '/messenger',
};
