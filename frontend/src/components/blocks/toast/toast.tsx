import ToastConsumer from "@/components/blocks/toast/toast-consumer";
import {getSession} from "@/contexts/auth/session";

export default async function Toast() {
  const session = await getSession()
  const flushMessages = session?.flushMessages || []
  const timestamp = Date.now()
  return (
    <>
      <ToastConsumer messages={flushMessages} timestamp={timestamp} />
    </>
  )
}
