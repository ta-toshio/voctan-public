import Link from "next/link"

import { cn } from "@/libs/utils"
import { MainNav } from "@/components/blocks/header/main-nav"
import { Button } from "@/components/ui/button";
import { auth } from "@/contexts/auth/auth";
import { Container } from "@/components/ui/craft";
import { MobileNav } from "@/components/blocks/header/mobile-nav";
import { UserNav } from "@/components/blocks/header/user-nav";

export async function SiteHeader() {
  const session = await auth()
  const user = session?.user
  // console.log("session in site header", user)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "border-border/40 bg-background/95",
        "backdrop-blur supports-[backdrop-filter]:bg-background/60"
      )}
    >
      <Container className="flex h-14 max-w-screen-2xl items-center">
        <MainNav/>
        <MobileNav/>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <nav className="flex gap-2 items-center">
            {user && (
              <UserNav user={user}/>
            )}
            {!user && (
              <>
                <Button asChild variant="link">
                  <Link href="/register">
                    登録
                  </Link>
                </Button>
                <Button asChild variant="link">
                  <Link href="/sign-in">
                    ログイン
                  </Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </Container>
    </header>
  )
}
