import { getIronSession, IronSession, } from "iron-session";
import { cookies } from "next/headers";

import { SessionData } from "../types/user";

export const getSession = (): Promise<IronSession<SessionData>> => {
  return getIronSession<SessionData>(
    cookies(),
    {
      password: process.env.SECRET_COOKIE_PASSWORD,
      cookieName: 'session',
      cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
      }
    },
  );
}
