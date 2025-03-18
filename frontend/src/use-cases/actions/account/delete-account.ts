"use server";


import { serverHttpClient } from "@/utils/server-fetch";
import { redirectIfNotAuthenticated } from "@/utils/app-redirect";
import { auth, signOut } from "@/contexts/auth/auth";

export const deleteAccount = async () => {
  await redirectIfNotAuthenticated()
  const session = await auth()

  const { error } = await serverHttpClient.DELETE(
    '/users/{user_id}',
    {
      params: {
        path: {
          user_id: session.user.id,
        }
      }
    }
  )
  if (error) {
    console.error(error)
    return { error: true }
  }

  await signOut()

  return {}
}
