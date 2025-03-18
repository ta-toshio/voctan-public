import { NextRequest } from "next/server";

import { serverHttpClient } from "@/utils/server-fetch";
import { auth } from "@/contexts/auth/auth";
import { errorAuthResponse } from "@/utils/app-response";

export async function GET(request: NextRequest) {
  if (!(await auth())) {
    return errorAuthResponse()
  }

  try {
    const { data, error } = await serverHttpClient.GET('/documents')
    if (error) {
      throw new Error(error.message)
    }

    return Response.json(data)

  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
