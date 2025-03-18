"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react";

import { Input } from "@/components/ui/input"
import { RegisterSchema } from "@/schemas"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { register } from "@/use-cases/actions/register";

import { Button } from "../../ui/button";

import CardWrapper from "./card-wrapper"
import { FormSuccess } from "./form-success";
import { FormError } from "./form-error";


const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirmation: ""
    }
  })

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    setLoading(true)
    register(data).then((res) => {
      if (res.error) {
        setError(res.error)
        setLoading(false)
        return
      }

      form.reset()
      setSuccess("仮登録が完了しました。メールを確認してください。")
      setLoading(false)
    })
  }

  return (
    <CardWrapper
      headerLabel="Fill out the form to create an account"
      title="登録"
      backButtonHref="/sign-in"
      backButtonLabel="ログインはこちら"
      showSocial
      signUp
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>メールアドレス</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="johndoe@email.com" type="email"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>おなまえ</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Doe"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>パスワード</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passwordConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>パスワード確認</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="******" type="password"/>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />

          </div>
          <FormSuccess message={success}/>
          <FormError message={error}/>
          <Button type="submit" className="w-full" disabled={loading}>
            アカウントを作成
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RegisterForm
