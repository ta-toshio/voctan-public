"use client"

// import {signOut as signOutAction} from "@/contexts/auth/auth";
import { signOut as signOutAction } from "next-auth/react"

export default function SignOut() {

  return (
    <button onClick={async () => {
      await signOutAction()
    }}>Sign Out</button>
  )
}
