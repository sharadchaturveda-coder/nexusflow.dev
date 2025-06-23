import { useState, useEffect } from 'react';
import Link from 'next/link';
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';
import { useSession } from 'next-auth/react'; // Import useSession

export default function Navbar() {
  const { status } = useSession(); // Get session status

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent pr-4">
          Nexus Flow AI
        </Link>
        <NavbarDesktop /> {/* No longer passing sections or activeSection */}
        <NavbarMobile /> {/* No longer passing sections */}
      </div>
    </nav>
  );
}
