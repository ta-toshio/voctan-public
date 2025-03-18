"use server";

import { redirect } from 'next/navigation'

import { serverHttpClient } from "@/utils/server-fetch";
import { redirectIfNotAuthenticated } from "@/utils/app-redirect";

export const fetchDocument = async (documentId: string) => {
  await redirectIfNotAuthenticated()

  const { data, error } = await serverHttpClient.GET(
    '/documents/{document_id}',
    {
      params: {
        path: {
          document_id: documentId
        }
      }
    }
  )

  if (error) {
    console.log('error', error)
    redirect('/')
  }
  return { data }
}
