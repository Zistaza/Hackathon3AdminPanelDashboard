// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');

    // Check if the provided credentials match the allowed ones
    if (user === 'zist234@gmail.com' && pwd === 'zistabcd3') {
      return NextResponse.next();
    }
  }

  // If authentication fails, respond with a 401 status code
  return new Response('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: ['/dashboard/:path*', '/orders/:path*', '/products/:path*', '/revenue/:path*'],
};
