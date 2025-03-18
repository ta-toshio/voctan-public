"use client";

import { signOut } from "next-auth/react"
import Link from "next/link";

import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
// import { signOut } from "@/contexts/auth/auth";


export default function UserNavItems() {
  return (
    <DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link href="/privacy-policy">プライバシーポリシー</Link>
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Link href="/terms-of-conditions">利用規約</Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        onClick={() => signOut()}
      >
        ログアウト
      </DropdownMenuItem>
    </DropdownMenuGroup>
)
}
