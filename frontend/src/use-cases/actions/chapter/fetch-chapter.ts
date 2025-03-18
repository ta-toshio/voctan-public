"use server";

import { serverHttpClient } from "@/utils/server-fetch";
import { redirectIfNotAuthenticated } from "@/utils/app-redirect";

export const fetchChapter = async (documentId: string) => {
  await redirectIfNotAuthenticated()

  const { data, error } = await serverHttpClient.GET(
    '/documents/{document_id}/chapters',
    {
      params: {
        path: {
          document_id: documentId
        }
      }
    }
  )

  if (error) console.error(error)

  return { data, error }
}
