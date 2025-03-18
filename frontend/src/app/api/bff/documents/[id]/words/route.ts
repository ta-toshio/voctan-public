import { NextRequest } from "next/server";

import { serverHttpClient } from "@/utils/server-fetch";
import { auth } from "@/contexts/auth/auth";
import { errorAuthResponse } from "@/utils/app-response";

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  if (!(await auth())) {
    return errorAuthResponse()
  }

  const documentId = context.params.id
  const searchParams = request.nextUrl.searchParams
  const page = searchParams.get('page')
  const search = searchParams.get('search')

  try {
    const { data, error } = await serverHttpClient.GET(
      '/documents/{document_id}/words',
      {
        params: {
          path: {
            document_id: documentId,
          },
          query: {
            page: /^[0-9]+$/.test(page) ? +page : 1,
            search,
          }
        }
      }
    )
    if (error) {
      throw new Error(error.message)
    }

    return Response.json(data)
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
