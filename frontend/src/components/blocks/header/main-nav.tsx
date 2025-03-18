"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { cn } from "@/libs/utils"

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center lg:mr-6">
        <Image src="/images/logo96.png" alt="VOCTAN" width={32} height={32} />
        <span className="hidden font-bold lg:inline-block">
          VOCTAN
        </span>
      </Link>
    </div>
  )
}
