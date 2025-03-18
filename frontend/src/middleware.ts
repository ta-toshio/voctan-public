import {NextRequest} from "next/server";

import { auth } from "@/contexts/auth/auth"

import {getSession} from "./contexts/auth/session";


export default auth(async (request: NextRequest) => {
  // const session = await getSession()
  // if (!session?.uuid && request.nextUrl.pathname !== '/') {
  //   return Response.redirect(`${request.nextUrl.origin}/`, 302);
  // }
})

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
