import React, { Fragment } from 'react';
import { motion } from 'framer-motion';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

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
      <div>
        {session ? (
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md bg-gradient-to-r from-pink-500 to-yellow-400 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                {session.user?.image ? (
                  <img src={session.user.image} alt="User Avatar" className="h-6 w-6 rounded-full mr-2" />
                ) : (
                  <span className="mr-2">{session.user?.email || 'Account'}</span>
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
                      <a
                        href="/dashboard"
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Dashboard
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/account"
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        My Account
                      </a>
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
        ) : (
          <button onClick={() => signIn('google')} className="px-4 py-2 bg-gradient-to-tr from-pink-500 to-yellow-400 text-white rounded-xl shadow-lg hover:scale-105 transition-all">Sign In</button>
        )}
      </div>
    </div>
  );
};

export default NavbarDesktop;
