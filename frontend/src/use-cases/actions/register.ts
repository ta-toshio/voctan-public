"use server";

import * as z from "zod";

import { RegisterSchema } from "@/schemas";
import { serverHttpClient } from "@/utils/server-fetch";
import { components } from "@/open-api/oa-schema";


export const register = async (data: z.infer<typeof RegisterSchema>): Promise<{
  data?: components["schemas"]["UserRegisterResponse"];
  error?: string;
}> => {
  // Validate the input data
  const validatedData = RegisterSchema.parse(data);

  //  If the data is invalid, return an error
  if (!validatedData) {
    return { error: "入力したデータが正しくないようです" };
  }

  //  Destructure the validated data
  const { email, name, password, passwordConfirmation } = validatedData;

  // Check if passwords match
  if (password !== passwordConfirmation) {
    return { error: "パスワードが一致していません" };
  }

  try {
    const email_verification = await serverHttpClient.POST("/user/register", {
      body: {
        email,
        name,
        password,
      },
    })
    if (email_verification.error) {
      return { error: "仮登録に失敗しました" };
    }

    return {
      data: email_verification.data
    }

  } catch (error) {
    return { error: "仮登録に失敗しました" };
  }
}
