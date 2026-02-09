"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4 border-b border-gray-300 bg-white sticky top-0 z-50">
      <div className="flex items-center gap-4 md:gap-8">
        {/* Brand Logo - Slightly smaller on mobile */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-black tracking-tighter text-pink-600 hover:scale-105 transition-transform shrink-0"
        >
          <span className="hidden sm:inline">DOODLE HEART</span>
        </Link>

        {/* Primary Navigation - Hidden on mobile */}
        <nav className="hidden md:flex items-center bg-gray-100 p-1 rounded-xl">
          <NavLink href="/dashboard" active={isActive("/dashboard")}>
            Parent Stats
          </NavLink>
          <NavLink href="/color-wheel" active={isActive("/color-wheel")}>
            Color Wheel
          </NavLink>
          <NavLink href="/calm-corner" active={isActive("/calm-corner")}>
            Calm Corner
          </NavLink>
        </nav>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Mobile: Icon only / Desktop: Full Button */}
        <Link
          href="/doodle"
          className="px-4 md:px-6 py-2 text-xs md:text-sm font-black text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:shadow-lg transition-all active:scale-95 whitespace-nowrap"
        >
          <span className="md:hidden">🎨 DRAW</span>
          <span className="hidden md:inline">🎨 START DOODLING</span>
        </Link>

        <Link
          href="/onboarding/login"
          className="px-3 md:px-6 py-2 text-xs md:text-sm font-black text-black border-b border-gray-300 md:border-none rounded-full hover:bg-gray-50 transition-all"
        >
          Logout
        </Link>
      </div>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${
        active
          ? "bg-white text-black shadow-sm"
          : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
    </Link>
  );
}
