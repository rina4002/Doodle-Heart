import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
      {/* The "Deeply Meaningful" Name */}
      <div className="text-xl font-bold tracking-tight text-pink-600">
        Doodle Heart
      </div>

      {/* The "I'm sure people will pay for this" Links */}
      <nav className="flex items-center gap-6">
        <Link href="/overview" className="text-sm font-medium hover:text-pink-500 transition-colors">
          Overview
        </Link>
        <Link href="/billing" className="text-sm font-medium hover:text-pink-500 transition-colors">
          Billing
        </Link>
        <Link 
          href="/login" 
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-gray-800 transition-all"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}