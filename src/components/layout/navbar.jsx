"use client";
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Button from '../ui/button';
import CurrencySelector from '../currency/currency-selector';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav ref={navRef} className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center" onClick={handleLinkClick}>
              <span className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">LMS</span>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link 
                href="/courses" 
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 border-b-2 border-transparent hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
                onClick={handleLinkClick}
              >
                Courses
              </Link>
              <Link 
                href="/categories" 
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 border-b-2 border-transparent hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
                onClick={handleLinkClick}
              >
                Categories
              </Link>
              <Link 
                href="/contact-us" 
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 border-b-2 border-transparent hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
                onClick={handleLinkClick}
              >
                Contact Us
              </Link>
            </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex sm:items-center sm:space-x-4">
              <CurrencySelector />
              <Button href="/login" variant="outline" className="border border-gray-300 hover:border-blue-600">Sign In</Button>
              <Button href="/signup">Get Started</Button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/courses"
            className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={handleLinkClick}
          >
            Courses
          </Link>
          <Link
            href="/categories"
            className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={handleLinkClick}
          >
            Categories
          </Link>
          <Link
            href="/tutors"
            className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            onClick={handleLinkClick}
          >
            Tutors
          </Link>
          <div className="pl-3 pr-4 py-2 space-y-2">
            <Button href="/login" variant="outline" className="border border-gray-300 hover:border-blue-600 w-full justify-center">Sign In</Button>
            <Button href="/signup" className="w-full justify-center">Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
