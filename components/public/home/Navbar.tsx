import { useState } from 'react';
import Link from "next/link";
import { Menu, X } from "lucide-react";
import logo from "@/public/assets/caremall.png";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-[#F2F0EA] sticky top-0 z-50 border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Menu Button & Logo - Grouped on mobile, separate on desktop */}
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-800 hover:text-red-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <Link href="/" className="flex items-center">
              <Image src={logo} alt="Care Mall" className="h-8 w-auto object-contain" />
            </Link>
          </div>

          {/* Desktop Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-12 flex-1 justify-center">
            <Link href="/how-it-works" className="text-gray-800 text-sm font-medium hover:text-red-600 transition-colors">
              How it Works
            </Link>
            <Link href="/commissions" className="text-gray-800 text-sm font-medium hover:text-red-600 transition-colors">
              Commissions
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-gray-800 text-sm font-medium px-4 py-2 hover:text-red-600 transition-colors border-2 border-gray-300 rounded">
              Login
            </Link>
            <Link href="/register" className="bg-red-600 text-white text-sm font-medium px-6 py-2.5 rounded hover:bg-red-700 transition-colors">
              Create an Account
            </Link>
          </div>

          {/* Mobile CTA - Right side on mobile */}
          <Link href="/register" className="md:hidden bg-red-600 text-white text-xs font-medium px-4 py-2 rounded hover:bg-red-700 transition-colors">
            Create an Account
          </Link>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-gray-100 pt-4">
            <Link 
              href="/how-it-works" 
              className="block text-gray-800 text-sm font-medium hover:text-red-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link 
              href="/commissions" 
              className="block text-gray-800 text-sm font-medium hover:text-red-600 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Commissions
            </Link>
            <Link 
              href="/login" 
              className="block text-gray-800 text-sm font-medium hover:text-red-600 transition-colors py-2 border-t border-gray-100 pt-3"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
