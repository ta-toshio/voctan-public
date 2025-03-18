import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import PdfSVG from "@/components/elements/svg/pdf";
import { Input } from "@/components/ui/input";
import { Form, FormMessage } from "@/components/ui/form";
import { PdfUploadSchema } from "@/schemas";
import { getUploadSignedUrl } from "@/use-cases/actions/get-upload-signed-url";
import { useToast } from "@/hooks/use-toast";
import { createDocument } from "@/use-cases/actions/document/create-document";
import { DocumentType } from "@/contexts/types/document";
import { createDocumentFailed, createDocumentSuccessDesc, createDocumentSuccessTitle } from "@/message";


type CreateFormPdfProps = {
  open: boolean
  setOpen: (open: boolean) => void
}

export default function CreateFromPdf({
  open,
  setOpen,
}: CreateFormPdfProps) {

  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof PdfUploadSchema>>({
    resolver: zodResolver(PdfUploadSchema),
    defaultValues: {
      file: null
    }
  })

  const onSubmit = async (formData: z.infer<typeof PdfUploadSchema>) => {
    const file = formData.file
    if (!file) {
      return
    }

    const { url: preSignedUrl, key: filePath, error } = await getUploadSignedUrl(file.name)
    if (error) {
      toast(({ title: 'アップロード処理の準備に失敗しました', variant: 'destructive' }))
      return
    }

    try {
      const response = await fetch(preSignedUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type },
      });

      if (!response.ok) {
        throw new Error("アップロード処理に失敗しました");
      }

      const { data, error } = await createDocument(filePath, DocumentType.BOOK)
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
            <PdfSVG width={24} height={24} className="mr-2"/>
            PDFアップロード
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 py-4"
          >
            <Input type="file" {...form.register('file')} accept="application/pdf"/>
            {form.formState.errors.file?.message && (
              <FormMessage>{form.formState.errors.file?.message}</FormMessage>
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
