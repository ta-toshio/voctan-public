import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google"

import { LoginSchema } from "@/schemas";
import { serverHttpClient } from "@/utils/server-fetch";
import { createOrGetUserWithIdToken, getUserByEmail } from "@/repositories/api/user";
import { getSession } from "@/contexts/auth/session";
import { createAccountSuccess } from "@/message";

export default {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = LoginSchema.safeParse(credentials)

        if (!validatedCredentials.success) {
          return null;
        }

        const { data, error } = await serverHttpClient.POST("/user/sign-in", {
          body: {
            email: credentials.email as string,
            password: credentials.password as string,
          }
        })
        if (error) {
          return null
        }
        return {
          id: data.id,
          email: data.email,
        };
      }
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        // console.log('account', account)
        // console.log('profile', profile)
        const { data, error } = await createOrGetUserWithIdToken({
          idToken: account.id_token,
          email: profile.email,
          name: profile.name,
        })
        if (error) {
          console.log('signIn callback error')
          console.error(error)
          return false
        }
        if (data.created) {
          const session = await getSession()
          session.flushMessages || (session.flushMessages = [])
          session.flushMessages.push(createAccountSuccess)
          await session.save();
        }
      }
      return true
    },
    async jwt({ token, user, account }) {
      // console.log("token in jwt", token);
      // console.log("user in jwt", user);
      // console.log("account in jwt", account);

      // google callbacks signInの直後
      if (account?.provider === "google") {
        token.provider = account.provider
        const { data, error } = await getUserByEmail(token.email, account.id_token)
        if (data) {
          token.id = data.id
        }
      }

      // email credential authorizeの直後
      if (account?.provider === "credentials") {
        token.id = user.id
      }

      return token;
    },
    async session({ token, session }) {
      // console.log("token in session", token);
      // console.log("session in session", session);

      return {
        ...session,
        user: {
          ...(token.id ? { id: token.id } : {}),
          ...session.user,
        },
      };
    },
  },
} satisfies NextAuthConfig;
