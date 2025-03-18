"use server"

import { serverHttpClient } from "@/utils/server-fetch";

export const validateVerification = async (token: string) => {

  const user = await serverHttpClient.POST("/user/verification", {
    body: {
      token
    }
  })

  if (user.error) {
    return { error: true }
  }

  return { data: user.data }
}
