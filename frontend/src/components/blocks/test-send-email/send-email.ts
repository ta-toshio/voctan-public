"use server"

import {resend} from "@/libs/mailer";

export const sendEmail = async () => {
  try {
    console.log('send email to')
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'nikitiki.app+resend02408@gmail.com',
      subject: 'Hello World !',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });
    return {
      message: 'email sent'
    }
  } catch (error) {
    console.error('error sending email', error)
    return {
      message: 'error sending email'
    }
  }
}
