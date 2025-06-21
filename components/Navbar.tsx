import { motion } from 'framer-motion';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Fragment, useState, useEffect } from 'react';

const sections = ['features', 'dashboard', 'pricing', 'faq'];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('features');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { threshold: 0.6 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-400 bg-clip-text text-transparent">
          Nexus Flow AI
        </div>
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
          <a href="#get-started" className="px-4 py-2 bg-gradient-to-tr from-pink-500 to-yellow-400 text-white rounded-xl shadow-lg hover:scale-105 transition-all">
            Get Started
          </a>
        </div>
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
                  {sections.map((section) => (
                    <Menu.Item key={section}>
                      {({ active }) => (
                        <a
                          href={`#${section}`}
                          className={`${
                            active ? 'bg-violet-500 text-white' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          {section.charAt(0).toUpperCase() + section.slice(1)}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#get-started"
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        Get Started
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </nav>
  );
}
