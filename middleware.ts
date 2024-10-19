// import createMiddleware from 'next-intl/middleware';
 
// export default createMiddleware({
//   // A list of all locales that are supported
//   locales: ['en', 'jp'],
 
//   // Used when no locale matches
//   defaultLocale: 'en'
// });
 
// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(jp|en)/:path*']
// };



import { clerkMiddleware } from "@clerk/nextjs/server";
import createMiddleware from 'next-intl/middleware';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'jp'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});

export default clerkMiddleware((auth, req) => {
 
  return intlMiddleware(req)
})

export const config = {
  matcher: [
    '/', '/(jp|en)/:path*',
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|mp3|wav)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};