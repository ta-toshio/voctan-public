"use server";

import { serverHttpClient } from "@/utils/server-fetch";
import { redirectIfNotAuthenticated } from "@/utils/app-redirect";

export const fetchDocumentWord = async (documentId: string, page: number = 1, search: string = "") => {
  await redirectIfNotAuthenticated()

  const { data, error } = await serverHttpClient.GET(
    '/documents/{document_id}/words',
    {
      params: {
        path: {
          document_id: documentId
        }
      }
    }
  )

  if (error) {
    console.error(error)
  }

  return { data, error }
}
