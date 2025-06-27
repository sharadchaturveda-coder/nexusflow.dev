import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useAuthStatus } from '@/lib/hooks/useAuthStatus';
import Link from 'next/link';
import Image from 'next/image';

interface AuthenticatedButtonsProps {
  isMobile?: boolean;
}

const AuthenticatedButtons: React.FC<AuthenticatedButtonsProps> = ({ isMobile = false }) => {
  const { session, signOut } = useAuthStatus();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className={`inline-flex w-full justify-center rounded-md bg-gradient-to-r from-pink-500 to-yellow-400 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${isMobile ? 'bg-gradient-to-r from-magenta to-orange' : ''}`}>
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt="User Avatar"
              width={24}
              height={24}
              className="h-6 w-6 rounded-full mr-2"
            />
          ) : (
            <span className="mr-2">{session?.user?.email || 'Account'}</span>
          )}
          <ChevronDownIcon
            className="-mr-1 ml-2 h-5 w-5 text-white hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/dashboard"
                  className={`${
                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Dashboard
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/account"
                  className={`${
                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  My Account
                </Link>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => signOut()}
                  className={`${
                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default AuthenticatedButtons;
