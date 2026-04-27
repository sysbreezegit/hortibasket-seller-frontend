"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className=" top-0 z-50 w-full bg-transparent backdrop-blur-sm">
      <div className="px-24 mx-auto">
        <div className="flex items-center justify-between py-4">
          <div className="">
            <Link href="/" className="flex items-center group">
              <Image
                src="/caremall.png"
                alt="care mall"
                width={1800}
                height={1800}
                className="h-10 w-auto group-hover:opacity-80 transition-opacity"
                priority
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#how-it-works"
              className="text-base font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              How it Works
            </Link>
            <Link
              href="#commissions"
              className="text-base font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              Commissions
            </Link>
            <Link
              href="#success-stories"
              className="text-base font-medium text-gray-700 hover:text-red-600 transition-colors"
            >
              Success Stories
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" className="text-gray-700 hover:text-red-600">
                Login
              </Button>
            </Link>
            <Link href="/">
              <Button className="bg-red-600 hover:bg-red-700 text-white">Create an Account</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
