import React from 'react';
import { motion } from 'framer-motion';
import AuthButtons from './auth/AuthButtons';
import { useSession } from 'next-auth/react';

interface NavbarDesktopProps {
  sections: string[];
  activeSection: string;
}

const NavbarDesktop: React.FC<NavbarDesktopProps> = ({ sections, activeSection }) => {
  const { data: session } = useSession();

  return (
    <div className="hidden md:flex space-x-6 text-gray-800 font-medium">
      {sections.map((section) => (
        <a
          key={section}
          href={`#${section}`}
          className={`relative text-gray-700 hover:text-pink-600 transition-all ${
            activeSection === section ? 'font-bold text-pink-600' : ''
          }`}
        >
          {section.charAt(0).toUpperCase() + section.slice(1)}
          {activeSection === section && (
            <motion.span
              layoutId="underline"
              className="absolute -bottom-1 left-0 h-[2px] w-full bg-pink-500"
            />
          )}
        </a>
      ))}
      <AuthButtons />
    </div>
  );
};

export default NavbarDesktop;
