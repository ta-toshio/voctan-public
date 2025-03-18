import createClient, { Middleware } from 'openapi-fetch'
import jwt, { JwtPayload } from 'jsonwebtoken'

import { API_URL } from "@/const"
import { paths } from "@/open-api/oa-schema"
import { auth } from "@/contexts/auth/auth";


interface Sub {
  id: string;
  // user_type: string;
}

interface Payload {
  sub: Sub;
}

const generateJWT = (payload: Payload): string => {
  return jwt.sign(
    payload,
    process.env.API_JWT_SECRET,
    { expiresIn: '1m' }
  )
}

const verifyJWT = (token: string): JwtPayload | string | null => {
  try {
    return jwt.verify(token, process.env.API_JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// if (!apiToken || !verifyJWT(apiToken)) {
//   apiToken = generateJWT({ sub });
// }


const myMiddleware: Middleware = {
  async onRequest({ request, options }) {
    const session = await auth()
    if (session) {
      const sub = { id: session.user.id }
      const apiToken = generateJWT({ sub });
      // console.log(apiToken)
      request.headers.set('Authorization', `Bearer ${apiToken}`)
    }
    return request;
  },
};

export const serverHttpClient = createClient<paths>({
  baseUrl: API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
})

serverHttpClient.use(myMiddleware)

