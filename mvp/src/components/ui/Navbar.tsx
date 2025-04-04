'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full bg-black/80 backdrop-blur-md text-white p-4 flex justify-between items-center shadow-lg">
      {/* Left side: Logo */}
      <div className="text-2xl font-bold tracking-wide text-green-300">Sweetlake</div>

      {/* Right side: Links */}
      <div className="flex space-x-6">
        <Link href="/signup" className="hover:text-green-400 transition">
          Sign Up
        </Link>
        <Link href="/login" className="hover:text-green-400 transition">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
