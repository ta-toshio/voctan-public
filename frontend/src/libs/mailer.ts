import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string) => {
  console.log('Sending verification email to:', email)
  const confirmationLink = `${process.env.APP_URL}/verify-email?token=${token}`

  try {
    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your email",
      html: `<p>Click <a href="${confirmationLink}">here</a> to verify your email.</p>`
    })
    if (error) {
      console.error('Error sending verification email:', error)
    }
  } catch (error) {
    console.error('Error sending verification email in throw:', error)
  }
}
