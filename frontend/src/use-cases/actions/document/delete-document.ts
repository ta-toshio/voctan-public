"use server";

import { serverHttpClient } from "@/utils/server-fetch";
import { redirectIfNotAuthenticated } from "@/utils/app-redirect";

export const deleteDocument = async (documentId: string) => {
  await redirectIfNotAuthenticated()

  const { data, error } = await serverHttpClient.DELETE(
    '/documents/{document_id}',
    {
      params: {
        path: {
          document_id: documentId
        }
      }
    }
  )

  return { data, error }
}
