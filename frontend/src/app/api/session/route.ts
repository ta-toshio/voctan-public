import { v7 as uuid } from 'uuid';

// read session
import {getSession} from "@/contexts/auth/session";
import {UserType} from "@/contexts/types/user";

// 使わない
export async function GET() {
  const session = await getSession()

  if (!session?.uuid) {
    session.isLoggedIn = false;
    session.uuid = uuid();
    session.type = UserType.GUEST;
    await session.save();
  }

  return Response.json({
    uuid: session.uuid,
    isLoggedIn: session.isLoggedIn,
    type: session.type,
  });
}
