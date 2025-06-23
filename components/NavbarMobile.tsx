import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import AuthButtons from './auth/AuthButtons';
import { useAuthStatus } from '@/lib/hooks/useAuthStatus';
import MobileAuthenticatedNavLinks from './MobileAuthenticatedNavLinks';
import MobileUnauthenticatedNavLinks from './MobileUnauthenticatedNavLinks';

interface NavbarMobileProps {
  // No longer needs sections prop
}

const NavbarMobile: React.FC<NavbarMobileProps> = () => {
  const { status } = useAuthStatus();

  return (
    <div className="md:hidden">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-gradient-to-r from-magenta to-orange px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <ChevronDownIcon
              className="h-5 w-5"
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
            <div className="px-1 py-1 ">
              {status === 'authenticated' ? (
                <MobileAuthenticatedNavLinks />
              ) : (
                <MobileUnauthenticatedNavLinks />
              )}
            </div>
            <div className="px-1 py-1">
              <AuthButtons isMobile={true} />
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default NavbarMobile;
