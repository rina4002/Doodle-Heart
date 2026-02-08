"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Helper to highlight active links
  const isActive = (path: string) => pathname === path;

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-gray-300 bg-white sticky top-0 z-50">
      <div className="flex items-center gap-8">
        {/* Brand Logo */}
        <Link href="/" className="text-2xl font-black tracking-tighter text-pink-600 hover:scale-105 transition-transform">
          DOODLE HEART 
        </Link>

        {/* Primary Navigation */}
        <nav className="hidden md:flex items-center bg-gray-100 p-1 rounded-xl">
          <NavLink href="/dashboard" active={isActive("/dashboard")}>Parent Stats</NavLink>
          <NavLink href="/color-wheel" active={isActive("/color-wheel")}>Color Analytics</NavLink>
          {/* <NavLink href="/history" active={isActive("/history")}>Art Gallery</NavLink> */}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* High-Contrast "Go Draw" Button */}
        <Link 
          href="/doodle" 
          className="px-6 py-2 text-sm font-black text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:shadow-lg transition-all active:scale-95"
        >
          🎨 START DOODLING
        </Link>

        <div className="h-6 w-[1px] bg-gray-200 mx-2" />

        <Link href="/billing" className="text-sm font-bold text-gray-500 hover:text-black">
          Billing
        </Link>
      </div>
    </header>
  );
}

// Small helper component for internal nav links
function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
        active ? "bg-white text-black shadow-sm" : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
    </Link>
  );
}