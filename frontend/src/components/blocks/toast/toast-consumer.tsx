"use client";

import { useEffect, useRef } from "react";

import { Toaster } from "@/components/ui/toaster"
import { deleteFlushMessages } from "@/use-cases/actions/flush-message";
import { useToast } from "@/hooks/use-toast";

export default function ToastConsumer({ messages, timestamp }: { messages: string[], timestamp: number }) {
  const { toast } = useToast()

  const prevTimestamp = useRef(Date.now());

  const showToast = messages.length && timestamp !== prevTimestamp.current;

  useEffect(() => {
    messages.forEach((message) => {
      if (message) {
        toast({
          title: message,
        })
      }
    })

    const clearFlushMessages = async () => {
      await deleteFlushMessages()
      // await fetch("/api/session/flush", { method: 'DELETE' })
    }
    if (showToast) {
      clearFlushMessages()
      prevTimestamp.current = timestamp
    }
  }, [messages, showToast])

  // import toast, {Toaster} from "react-hot-toast";
  // return (
  //   <>
  //     <Toaster
  //       position="top-center"
  //       reverseOrder={false}
  //       gutter={8}
  //       toastOptions={{
  //         // Define default options
  //         className: '',
  //         duration: 2000,
  //         style: {
  //           background: '#363636',
  //           color: '#fff',
  //         }
  //       }}
  //     />
  //   </>
  // )

  return <Toaster/>

}
