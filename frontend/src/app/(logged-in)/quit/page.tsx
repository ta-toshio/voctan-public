"use client"

import { AlertCircle } from "lucide-react"
import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"
import { deleteAccount } from "@/use-cases/actions/account/delete-account";
import { confirmDeleteAccount, deleteAccountFailed, deleteAccountSuccess } from "@/message";
import { useToast } from "@/hooks/use-toast";


export default function CancellationPage() {

  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (confirm(confirmDeleteAccount)) {
      const result = await deleteAccount()
      if (result?.error) {
        toast(({ title: deleteAccountFailed, variant: 'destructive' }))
        return
      }
      toast(({ title: deleteAccountSuccess }))
      router.replace('/')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-background rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">アカウント退会</h1>

      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6" role="alert">
        <div className="flex">
          <AlertCircle className="h-6 w-6 mr-2" />
          <p>
            警告: アカウントを削除すると、すべてのデータが永久に失われます。この操作は取り消せません。
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Button
          type="submit"
          className="w-full"
        >
          アカウントを削除する
        </Button>
      </form>
    </div>
  )
}
