"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, useCallback } from "react"
import Link from "next/link";
import { AlertCircle, CheckCircle } from "lucide-react";

import { validateVerification } from "@/use-cases/actions/validate-verification"
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const VerifyEmailForm = () => {
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token")

  const onSubmit = useCallback(() => {
    if (success || error) {
      return
    }

    if (!token) {
      setError(true)
      return
    }

    validateVerification(token).then((data) => {
      if (data.error) {
        setError(true)
        return
      }

      setSuccess(true)
    }).catch((error) => {
      console.error(error)
      setError(true)
    })
  }, [token, success, error])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {!success && !error && <LoadingSpinner/>}
      {!success && error && <ErrorComponent/>}
      {success && <SuccessComponent/>}
    </div>
  )
}

const ErrorComponent = () => {
  return (
    <Card className="w-full max-w-md md:max-w-xl">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="w-12 h-12 text-red-600"/>
        </div>
        <CardTitle className="text-2xl font-bold">登録失敗</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center mb-4">
          有効期限が切れている、または使用済みのURLの可能性があります。
        </p>
      </CardContent>
      <CardFooter>
        <Link href="/" className="text-gray-600 hover:underline text-sm mx-auto">
          トップへ戻る
        </Link>
      </CardFooter>
    </Card>
  )
}

const SuccessComponent = () => {
  return (
    <Card className="w-full max-w-md md:max-w-xl">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-12 h-12 text-green-500"/>
        </div>
        <CardTitle className="text-2xl font-bold">登録完了</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm text-gray-600 mb-4">
          英語を読むことがはかどる。<br />
          そんなふうに思ってもらえるサービスになれたらうれしいです。
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href="/sign-in">
          <Button className="w-full">ログインへ</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default VerifyEmailForm
