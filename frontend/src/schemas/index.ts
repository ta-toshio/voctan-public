import * as z from 'zod'

export const RegisterSchema = z.object({
  email: z.string().email({
    // message: " Please enter a valid email address."
    message: "正しいメールアドレスを入力してください"
  }),
  name: z.string().min(1, {
    // message: "Name is required."
    message: "名前を入力してください"
  }),
  password: z.string().min(6, {
    // message: "Password must be at least 6 characters long."
    message: "パスワードは6文字以上で入力してください"
  }),
  passwordConfirmation: z.string().min(6, {
    // message: "Password must be at least 6 characters long."
    message: "入力したパスワードが合っていないようです"
  })
})

export const LoginSchema = z.object({
  email: z.string().email({
    // message: "Please enter a valid email address",
    message: "正しいメールアドレスを入力してください",
  }),
  password: z.string().min(6, {
    // message: "Please enter a valid password",
    message: "パスワードは6文字以上で入力してください",
  }),
})

export const PdfUploadSchema = z.object({
  file: z
    .custom<FileList>()
    .refine((file) => file && file.length !== 0, {
      message: "PDFファイルを選択してください"
    })
    .transform((file) => file[0])
    .refine((file) => file && file.type === 'application/pdf', {
      message: "PDFファイルを選択してください"
    })
    .refine((file) => file && file.size < 1024 * 1024 * 50, {
      message: "50MB以下のPDFファイルを選択してください"
    })
})

export const UrlSchema = z.object({
  url: z.string().url({
    // message: "Please enter a valid url",
    message: "正しいURLを入力してください",
  }),
})
