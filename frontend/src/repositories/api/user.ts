import { serverHttpClient } from "@/utils/server-fetch";

type createOrGetUserWithIdTokenProps = {
  idToken: string;
  email: string;
  name: string;
}

export const createOrGetUserWithIdToken = (props: createOrGetUserWithIdTokenProps) => {
  return serverHttpClient.POST('/user/sign-in-with-google', {
    body: {
      id_token: props.idToken,
      email: props.email,
      name: props.name,
    }
  })
}


export const getUserByEmail = (email: string, idToken: string) => {
  return serverHttpClient.GET('/user/by-email-with-google-token', {
    params: {
      query: {
        email,
        id_token: idToken,
      }
    }
  })
}
