import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/use-cases/actions/sign-in-with-google";

type SocialProps = {
  signUp?: boolean;
}

export default function Social({ signUp }: SocialProps) {
  return (
    <>
      <div className="relative mt-4 mb-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"/>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {/*Or continue with*/}
          </span>
        </div>
      </div>
      <Button variant="outline" className="w-full" onClick={() => signInWithGoogle()}>
        <FcGoogle className="google-icon mr-1"/>
        Googleで{signUp ? "登録" : "ログイン"}
      </Button>
    </>
  )
}
