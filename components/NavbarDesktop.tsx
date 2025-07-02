import { motion } from 'framer-motion';
import AuthButtons from './auth/AuthButtons';
import { useSession } from 'next-auth/react';

import Link from 'next/link'; // Import Link component

interface NavbarDesktopProps {
  // No longer needs sections or activeSection props
}

const NavbarDesktop: React.FC<NavbarDesktopProps> = () => {
  const { status } = useSession();

  return (
    <div className="hidden md:flex items-center space-x-6 text-gray-800 font-medium">
      {status === 'authenticated' ? (
        <>
          <Link href={status === 'authenticated' ? '/dashboard' : '/dashboard-preview'} className="hover:text-pink-600 transition-all">
            CRM
          </Link>
          <Link href="/chat" className="hover:text-pink-600 transition-all">
            Chat
          </Link>
          <Link href="/billing" className="hover:text-pink-600 transition-all">
            Billing
          </Link>
          <Link href="/help" className="hover:text-pink-600 transition-all">
            Help
          </Link>
        </>
      ) : (
        <>
          <Link href="/#features" className="hover:text-pink-600 transition-all">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-pink-600 transition-all">
            Pricing
          </Link>
          <Link href="/#faq" className="hover:text-pink-600 transition-all">
            FAQ
          </Link>
        </>
      )}
      <AuthButtons />
    </div>
  );
};

export default NavbarDesktop;
