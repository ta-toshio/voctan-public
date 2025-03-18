import { useForm } from "react-hook-form";
import { z } from "zod";
import { TvMinimalPlay } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormMessage } from "@/components/ui/form";
import { UrlSchema } from "@/schemas";
import { useToast } from "@/hooks/use-toast";
import { createDocument } from "@/use-cases/actions/document/create-document";
import { DocumentType } from "@/contexts/types/document";
import { createDocumentFailed, createDocumentSuccessDesc, createDocumentSuccessTitle } from "@/message";

type CreateFormVideoProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function CreateFromVideo(
  {
    open,
    setOpen,
  }: CreateFormVideoProps) {

  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof UrlSchema>>({
    resolver: zodResolver(UrlSchema),
    defaultValues: {
      url: null
    }
  })

  const onSubmit = async (formData: z.infer<typeof UrlSchema>) => {
    const url = formData.url
    if (!url) {
      return
    }

    try {
      const { data, error } = await createDocument(url, DocumentType.VIDEO)
      if (error) {
        throw new Error(createDocumentFailed)
      }

      toast({
        title: createDocumentSuccessTitle,
        description: createDocumentSuccessDesc,
        duration: 10000,
      })
      setOpen(false)
      form.reset()
      router.push(`/documents/${data.id}`)

    } catch (error) {
      toast(({ title: error.message, variant: 'destructive' }))
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <TvMinimalPlay width={24} height={24} className="mr-2"/>
            Youtube URL
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >

            <Input type="text" {...form.register('url')} />
            {form.formState.errors.url?.message && (
              <FormMessage>{form.formState.errors.url?.message}</FormMessage>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              作成
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
