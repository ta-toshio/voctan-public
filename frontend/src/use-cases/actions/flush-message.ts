"use server"

import { getSession } from "@/contexts/auth/session";

export async function deleteFlushMessages() {
  const session = await getSession()
  session.flushMessages = [];
  await session.save();

  return {
    message: "flushed"
  }
}
