import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useToast } from "@/hooks/use-toast";

export const useRedirectIfError = async (error: any, message: string) => {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (error) {
      toast({
        title: message,
        variant: 'destructive',
      })
      return router.push('/')
    }
  }, [error, message, router, toast])

}
