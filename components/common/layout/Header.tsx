"use client";

import React, { useState, useEffect } from "react";
import { Search, ShoppingCart, Heart, User } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";
import StaggeredMenu from "./StaggeredMenu";

// ─── Nav links ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { name: "Plants", href: "/plants" },
  { name: "Seeds", href: "/seeds" },
  { name: "Pots & Planters", href: "/pots" },
  { name: "Tools", href: "/tools" },
  { name: "Fertilizers", href: "/fertilizers" },
];

// StaggeredMenu expects { label, ariaLabel?, link }
const MENU_ITEMS = NAV_LINKS.map((l) => ({
  label: l.name,
  ariaLabel: `Go to ${l.name}`,
  link: l.href,
}));

const SOCIAL_ITEMS = [
  { label: "Instagram", link: "https://instagram.com/hortibasket" },
  { label: "Facebook", link: "https://facebook.com/hortibasket" },
  { label: "WhatsApp", link: "https://wa.me/hortibasket" },
];

// ─── Header ───────────────────────────────────────────────────────────────────

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-100 w-full">
      {/* Top Bar */}
      <div className="bg-[#1a3320] text-white py-1.5 px-4 text-center text-[10px] font-bold uppercase tracking-widest sm:text-[11px] w-full">
        Free shipping on all orders above ₹499
      </div>

      <div
        className={cn(
          "w-full transition-all duration-300 border-b",
          scrolled
            ? "bg-[#F2F0EA]/95 backdrop-blur-md py-2 shadow-sm border-gray-100"
            : "bg-[#F2F0EA] py-4 border-transparent"
        )}
      >
        <MaxWidthWrapper className="max-w-none w-full px-2.5 sm:px-8 md:px-12">
          <div className="flex items-center justify-between gap-1">

            {/* ── Mobile: StaggeredMenu trigger + Logo ── */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* The hamburger button is rendered inside StaggeredMenu */}
              <div className="lg:hidden">
                <StaggeredMenu
                  position="left"
                  items={MENU_ITEMS}
                  socialItems={SOCIAL_ITEMS}
                  displaySocials
                  displayItemNumbering
                  menuButtonColor="#224229"
                  openMenuButtonColor="#ffffff"
                  changeMenuColorOnOpen
                  colors={["#224229", "#1a3320"]}
                  accentColor="#89C839"
                  onMenuOpen={() => console.log("Hortibasket menu opened")}
                  onMenuClose={() => console.log("Hortibasket menu closed")}
                />
              </div>

              {/* Logo */}
              <Link href="/" className="flex items-center gap-1.5 md:gap-2 group">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#224229] rounded-lg flex items-center justify-center text-[#89C839] shrink-0">
                  <span className="font-black text-[10px] sm:text-xs italic">H</span>
                </div>
                <span className="text-base sm:text-lg md:text-2xl font-black text-[#224229] tracking-tighter uppercase">
                  Hortibasket
                </span>
              </Link>
            </div>

            {/* ── Desktop Navigation ── */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
              {NAV_LINKS.slice(0, 4).map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[12px] xl:text-[13px] font-bold text-gray-500 hover:text-[#224229] transition-colors uppercase tracking-widest"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* ── Actions ── */}
            <div className="flex items-center gap-0.5 sm:gap-4 md:gap-5 pr-1">
              <button className="hidden md:block p-2 text-gray-400 hover:text-[#224229] transition-colors">
                <Search size={20} />
              </button>

              <Link
                href="/wishlist"
                className="p-2 text-gray-400 hover:text-[#224229] transition-colors relative"
              >
                <Heart size={20} />
                <span className="absolute top-1 right-1 bg-[#89C839] text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </Link>

              <Link
                href="/cart"
                className="p-2 text-gray-400 hover:text-[#224229] transition-colors relative"
              >
                <ShoppingCart size={20} />
                <span className="absolute top-1 right-1 bg-[#224229] text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  0
                </span>
              </Link>

              <Link
                href="/profile"
                className="flex items-center justify-center w-10 h-10 bg-gray-100 text-[#224229] rounded-full hover:bg-[#224229] hover:text-white transition-all"
              >
                <User size={18} />
              </Link>
            </div>

          </div>
        </MaxWidthWrapper>
      </div>
    </header>
  );
};

export default Header;
