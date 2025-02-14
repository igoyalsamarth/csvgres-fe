import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export default clerkMiddleware(async (auth) => {
  const { userId } = await auth();

  if (userId) {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': process.env.NEXT_PUBLIC_APP_URL || '',
          'authorization': `Bearer ${(await cookies()).get('__session')?.value}`
        },
        credentials: 'include',
        cache: 'no-store',
        mode: 'cors',
        body: JSON.stringify({
          userId,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`API response not OK: ${response.status}`);
      }

      await response.json();

    } catch (error) {
      console.error(error);
      const nextResponse = NextResponse.next();
      return nextResponse;
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};