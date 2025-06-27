import Link from 'next/link';
import { Menu } from '@headlessui/react';

interface MobileMenuItemLinkProps {
  href: string;
  children: React.ReactNode;
}

const MobileMenuItemLink: React.FC<MobileMenuItemLinkProps> = ({ href, children }) => {
  return (
    <Menu.Item>
      {({ active }) => (
        <Link
          href={href}
          className={`${
            active ? 'bg-violet-500 text-white' : 'text-gray-900'
          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
        >
          {children}
        </Link>
      )}
    </Menu.Item>
  );
};

export default MobileMenuItemLink;
