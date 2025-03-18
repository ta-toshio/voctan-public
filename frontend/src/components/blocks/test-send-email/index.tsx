"use client"

import {sendEmail} from "@/components/blocks/test-send-email/send-email";

export default function TestSendEmail() {
  return (
    <div>
      <h1>test send email</h1>
      <p>
        <button onClick={async () => {
          const res = await sendEmail()
          console.log(res)
        }}>send email</button>
      </p>
    </div>
  );
}
