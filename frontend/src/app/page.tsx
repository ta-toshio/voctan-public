import { auth } from "@/contexts/auth/auth";
import Landing from "@/app/_pages/landing";
import LoggedInTopIndex from "@/app/_pages/loggin-in-top";
import LoggedInLayout from "@/app/(logged-in)/layout";

export default async function Home() {
  const session = await auth();
  const user = session?.user;

  return user ? (
    <LoggedInLayout>
      <LoggedInTopIndex/>
    </LoggedInLayout>
  ) : (
    <Landing/>
  )
}

