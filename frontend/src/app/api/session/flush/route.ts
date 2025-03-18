import {getSession} from "@/contexts/auth/session";

// 使っていない
export async function DELETE() {

  const session = await getSession()
  session.flushMessages = [];
  await session.save();

  return Response.json({ message: 'Session flushed' });
}
