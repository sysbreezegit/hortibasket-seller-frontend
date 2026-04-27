"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Youtube, Mail } from "lucide-react"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    // Add your newsletter subscription API call here
    setTimeout(() => {
      setEmail("")
      setLoading(false)
    }, 500)
  }

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="px-24 mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Newsletter Section */}
          <div className="md:col-span-1">
            <div className="mb-6">
              <Link href="/" className="inline-block">
                <Image src="/caremall.png" alt="core moll" width={1800} height={1800} className="h-10 w-auto" />
              </Link>
            </div>

            <div className="flex gap-4 mb-8">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                aria-label="YouTube"
                className="text-gray-400 hover:text-red-600 transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>

            <h4 className="text-lg font-semibold mb-3">Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">Subscribe to get updates on new arrivals and promotions</p>

            <form onSubmit={handleSubscribe} className="flex items-center bg-[#F2F0EA] rounded-md overflow-hidden">
              <Mail className="text-gray-500 ml-3" size={18} />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 w-full text-sm text-gray-900 outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-red-600 text-white px-4 text-sm font-medium py-2 hover:bg-red-700 transition-colors disabled:opacity-60"
              >
                {loading ? "..." : "Subscribe"}
              </button>
            </form>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/orders" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/deliveries" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Deliveries
                </Link>
              </li>
              <li>
                <Link href="/payments" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Payments
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Returns & Refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  About Company
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/cities" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Cities We Serve
                </Link>
              </li>
              <li>
                <Link href="/partner" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Become a Partner
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  News
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-gray-400 hover:text-red-600 transition-colors text-sm">
                  Media
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">© 2025 Core Moll. All rights reserved.</p>
          <div className="flex gap-6 text-xs">
            <Link href="/terms" className="text-gray-400 hover:text-red-600 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-red-600 transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
