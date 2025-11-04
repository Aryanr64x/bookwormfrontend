'use client'

import Link from "next/link";


const Navbar = ()=>{
   return (
    <nav className="flex justify-between items-center px-8 py-4 text-white">
      {/* Left Side: Logo */}
      <Link href="/" className="text-2xl font-bold cursor-pointer">
        Bookworm
      </Link>

      {/* Right Side: Navigation Links */}
      <div className="flex gap-6">
        <Link
          href="/lists"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Lists
        </Link>
        <Link
          href="/reviews"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Reviews
        </Link>
        <Link
          href="/logout"
          className="text-gray-300 hover:text-white transition-colors"
        >
          Logout
        </Link>
      </div>
    </nav>
  );
}

export default Navbar