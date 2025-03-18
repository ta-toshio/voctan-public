import Link from "next/link";
import type { Metadata } from "next";

import LoginForm from "@/components/blocks/auth/login-form"
import { Main } from "@/components/ui/craft";

export const metadata: Metadata = {
  title: 'ログイン',
  robots: {
    index: false,
    follow: true
  }
}

const SignInPage = () => {
  return (
    <Main className="xl:w-1/4 md:w-1/2 w-full px-10 sm:px-0">
      <LoginForm/>
      <Link
        className="block mt-4 text-sm text-muted-foreground"
        href="/">トップに戻る</Link>
    </Main>
  )
}

export default SignInPage
