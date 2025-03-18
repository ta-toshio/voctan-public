"use server";
import * as z from "zod";
import { redirect } from "next/navigation";

import { LoginSchema } from "@/schemas";
import { signIn } from "@/contexts/auth/auth";

export const login = async (data: z.infer<typeof LoginSchema>) => {
  // Validate the input data
  const validatedData = LoginSchema.parse(data);

  // If the data is invalid, return an error
  if (!validatedData) {
    return { error: "メールアドレスまたはパスワードが違います。" };
  }
  let redirectUrl: string;

  try {
    redirectUrl = await signIn("credentials", {
      email: validatedData.email,
      password: validatedData.password,
      redirectTo: "/",
      redirect: false,
    });

    // const session = await getSession()
    // session.isLoggedIn = true
    // session.flushMessages = ["User logged in successfully"]
    // await session.save()

  } catch (error) {
    console.log('error in login', error)
    return { error: "メールアドレスまたはパスワードが違います。" };
  }

  return redirect(redirectUrl)
};
