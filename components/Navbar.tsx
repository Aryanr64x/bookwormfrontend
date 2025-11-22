'use client'

import { authContext } from "@/app/contexts/AuthContextWrapper";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useReducer } from "react";


const Navbar = ()=>{
  const auth  = useContext(authContext)
  const router = useRouter()
  const logout = ()=>{
    auth?.signout()
    console.log('LOGING OUT BYE BYE')
    router.replace('/')
  }
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
        <button
          onClick={logout}
          className="text-gray-300 hover:text-white hover:cursor-pointer transition-colors"

        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar