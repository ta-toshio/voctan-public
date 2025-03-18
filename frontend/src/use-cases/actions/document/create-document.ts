"use server";

import { serverHttpClient } from "@/utils/server-fetch";
import { components } from "@/open-api/oa-schema";
import { redirectIfNotAuthenticated } from "@/utils/app-redirect";

export const createDocument = async (source: string, type: components['schemas']['CreateDocumentRequest']['type']) => {
  await redirectIfNotAuthenticated()

  const { data, error } = await serverHttpClient.POST(
    '/documents',
    { body: { source, type } }
  )
  return { data, error }
}
