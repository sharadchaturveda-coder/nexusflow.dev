import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaTwitterSquare } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1: Product */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-gray-400 transition-colors duration-200">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-gray-400 transition-colors duration-200">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-gray-400 transition-colors duration-200">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="hover:text-gray-400 transition-colors duration-200">
                  Docs
                </Link>
              </li>
              <li>
                <Link href="/help" className="hover:text-gray-400 transition-colors duration-200">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-gray-400 transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-gray-400 transition-colors duration-200">
                  API Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-gray-400 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gray-400 transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-gray-400 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-gray-400 transition-colors duration-200">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            © 2025 Nexus Flow AI, Inc. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="#" aria-label="Instagram" className="hover:text-white transition-colors duration-200">
              <FaInstagram className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="Facebook" className="hover:text-white transition-colors duration-200">
              <FaFacebook className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="Twitter/X" className="hover:text-white transition-colors duration-200">
              <FaTwitterSquare className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;