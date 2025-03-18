import { redirect, RedirectType } from "next/navigation";

import { auth } from "@/contexts/auth/auth";


export const redirectIfNotAuthenticated = async (url: string = '/', type?: RedirectType) => {
  const session = await auth()
  if (!session) {
    return redirect(url, type)
  }
}
