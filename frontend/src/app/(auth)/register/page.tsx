import type { Metadata } from "next";

import RegisterForm from "@/components/blocks/auth/register-form"

export const metadata: Metadata = {
  title: '登録',
  robots: {
    index: false,
    follow: true
  }
}

const RegisterPage = () => {
  return (
    <div className="xl:w-1/4 md:w-1/2 w-full px-10 sm:px-0">
        <RegisterForm />
    </div>
  )
}

export default RegisterPage
