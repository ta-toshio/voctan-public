"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import Link from "next/link";

import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import { login } from "@/use-cases/actions/login";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "../../ui/button";


import { FormError } from "./form-error";
import CardWrapper from "./card-wrapper";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    login(data).then((res) => {
      if (res?.error) {
        setError(res?.error);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Log in to your account"
      title="ログイン"
      backButtonHref="/register"
      // backButtonLabel="Don't have an account? Register here."
      backButtonLabel="アカウントをお持ちでない方はこちら"
      showSocial
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
                    <Input
                      {...field}
                      placeholder="johndoe@email.com"
                      type="email"
                    />
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
            {/*
            // @TODO
            <Button
              size="sm"
              variant="link"
              asChild
              className="px-0 font-normal"
            >
              <Link href="/auth/reset">Forgot password?</Link>
            </Button>
            */}
          </div>
          <FormError message={error}/>
          <Button type="submit" className="w-full" disabled={loading}>
            ログイン
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default LoginForm;
