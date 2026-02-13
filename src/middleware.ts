import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './lib/i18n';

export function middleware(request: NextRequest) {
  // Language detection
  const pathname = request.nextUrl.pathname;
  const langCookie = request.cookies.get('NEXT_LOCALE')?.value;
  
  // Check if the path starts with a supported locale
  const pathLocale = pathname.split('/')[1];
  const supportedLocales = ['en', 'pt', 'es'];
  
  // Redirect to default locale if no locale is present
  if (!supportedLocales.includes(pathLocale) && pathname !== '/' && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
    const response = NextResponse.redirect(new URL(`/en${pathname}`, request.url));
    response.cookies.set('NEXT_LOCALE', 'en');
    return response;
  }

  // Set language cookie based on path
  if (supportedLocales.includes(pathLocale)) {
    const response = NextResponse.next();
    response.cookies.set('NEXT_LOCALE', pathLocale);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};