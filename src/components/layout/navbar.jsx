'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Button from '../ui/button';
import CurrencySelector from '../currency/currency-selector';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for user data in localStorage
    const checkUserAuth = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };

    // Initial check
    checkUserAuth();

    // Listen for storage events (login/logout)
    window.addEventListener('storage', checkUserAuth);
    
    // Custom event for auth state changes
    window.addEventListener('authStateChange', checkUserAuth);

    return () => {
      window.removeEventListener('storage', checkUserAuth);
      window.removeEventListener('authStateChange', checkUserAuth);
    };
  }, []);

  const getNavItems = (role) => {
    if (!role) {
      return [
        { href: '/courses', label: 'Courses' },
        { href: '/categories', label: 'Categories' },
        { href: '/about-us', label: 'About Us' },
        { href: '/contact-us', label: 'Contact Us' }
      ];
    }

    switch (role) {
      case 'student':
        return [
          { href: '/courses', label: 'Courses' },
          { href: '/dashboard/student', label: 'My Learning' },
          { href: '/dashboard/student/wishlist', label: 'Wishlist' },
          { href: '/dashboard/student/courses/certificates', label: 'Certificates' },
          { href: '/dashboard/student/profile', label: 'Profile' }
        ];
      case 'instructor':
        return [
          { href: '/dashboard/instructor', label: 'My Courses' },
          { href: '/dashboard/instructor/analytics', label: 'Analytics' },
          { href: '/dashboard/instructor/earnings', label: 'Earnings' },
          { href: '/dashboard/instructor/profile', label: 'Profile' }
        ];
      case 'admin':
        return [
          { href: '/dashboard/admin', label: 'Overview' },
          { href: '/dashboard/admin/users', label: 'Users' },
          { href: '/dashboard/admin/courses', label: 'Courses' },
          { href: '/dashboard/admin/analytics', label: 'Analytics' },
          { href: '/dashboard/admin/profile', label: 'Profile' }
        ];
      default:
        return [
          { href: '/courses', label: 'Courses' },
          { href: '/categories', label: 'Categories' },
          { href: '/about-us', label: 'About Us' },
          { href: '/contact-us', label: 'Contact Us' }
        ];
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('authStateChange'));
    router.push('/');
    setIsDropdownOpen(false);
  };

  const navItems = getNavItems(user?.role);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">LMS</span>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 border-b-2 border-transparent hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex sm:items-center sm:space-x-4">
              <CurrencySelector />
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="hidden md:block">
                      <p className="text-sm font-medium text-gray-700">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                  </div>
                      <button
                        onClick={handleLogout}
                    className="text-sm text-red-600 hover:text-red-700"
                      >
                        Sign out
                      </button>
                </div>
              ) : (
                <>
                  <Button href="/auth/login" variant="outline" className="border border-gray-300 hover:border-blue-600">Sign In</Button>
                  <Button href="/auth/signup">Get Started</Button>
                </>
              )}
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
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            >
              {item.label}
            </Link>
          ))}
          <CurrencySelector />
          {user ? (
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name}</div>
                  <div className="text-sm font-medium text-gray-500 capitalize">{user.role}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-50"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="pl-3 pr-4 py-2 space-y-2">
              <Button href="/auth/login" variant="outline" className="border border-gray-300 hover:border-blue-600 w-full justify-center">Sign In</Button>
              <Button href="/auth/signup" className="w-full justify-center">Get Started</Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
