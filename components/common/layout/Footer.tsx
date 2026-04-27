"use client";

import React from "react";
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone, Github } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#1a3320] text-gray-200 pt-16 pb-8">
      <MaxWidthWrapper>
        {/* Newsletter Section */}
        <div className="border-b border-gray-700 pb-12 mb-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
          <div className="max-w-md">
            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">Join our Green Community</h3>
            <p className="text-gray-400 text-sm">Subscribe to get plant care tips and exclusive nursery offers.</p>
          </div>
          <div className="w-full lg:max-w-md">
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-[#F2F0EA]/5 border border-white/10 rounded-xl sm:rounded-full py-3.5 px-6 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#89C839] focus:bg-[#F2F0EA]/10 transition-all"
              />
              <button className="bg-[#89C839] hover:bg-[#74a930] text-[#1a3320] font-bold py-3.5 px-8 rounded-xl sm:rounded-full transition-all text-sm shrink-0 shadow-lg shadow-[#89C839]/10">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-[#F2F0EA] rounded-lg flex items-center justify-center text-[#224229]">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.3-.25.64-.25 1.01 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zM12 2C9.5 2 7 4 7 7s5 8 5 8 5-5 5-8-2.5-5-5-5zm0 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white leading-none">hortibasket.com</span>
                <span className="text-[10px] font-semibold text-[#89C839] tracking-[0.2em] uppercase leading-none mt-1">Easy Gardening</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bringing nature closer to your home. We provide the finest collection of plants, seeds, and gardening tools to make your space greener and healthier.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-[#224229] hover:bg-[#89C839] rounded-full transition-colors text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-2 bg-[#224229] hover:bg-[#89C839] rounded-full transition-colors text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 bg-[#224229] hover:bg-[#89C839] rounded-full transition-colors text-white">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-sm hover:text-[#89C839] transition-colors">About Us</Link></li>
              <li><Link href="/shop" className="text-sm hover:text-[#89C839] transition-colors">Our Nursery</Link></li>
              <li><Link href="/blogs" className="text-sm hover:text-[#89C839] transition-colors">Plant Care Blogs</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-[#89C839] transition-colors">Contact Us</Link></li>
              <li><Link href="/careers" className="text-sm hover:text-[#89C839] transition-colors">Join Our Team</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Customer Care</h4>
            <ul className="space-y-4">
              <li><Link href="/faq" className="text-sm hover:text-[#89C839] transition-colors">FAQs</Link></li>
              <li><Link href="/shipping" className="text-sm hover:text-[#89C839] transition-colors">Shipping Information</Link></li>
              <li><Link href="/returns" className="text-sm hover:text-[#89C839] transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/order-tracking" className="text-sm hover:text-[#89C839] transition-colors">Track Your Order</Link></li>
              <li><Link href="/privacy" className="text-sm hover:text-[#89C839] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-white font-bold text-lg">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-sm">
                <MapPin className="text-[#89C839] shrink-0" size={20} />
                <span>123 Green Lane, Eco Park, New Delhi, India 110001</span>
              </li>
              <li className="flex gap-3 text-sm">
                <Phone className="text-[#89C839] shrink-0" size={20} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex gap-3 text-sm">
                <Mail className="text-[#89C839] shrink-0" size={20} />
                <span>support@hortibasket.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© 2026 hortibasket.com. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
