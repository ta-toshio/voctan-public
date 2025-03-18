"use server";


import { signIn } from "@/contexts/auth/auth";

export const signInWithGoogle = async () => {
  try {
    await signIn("google", { redirectTo: "/" });
  } catch (error) {
    throw error;
  }
};
