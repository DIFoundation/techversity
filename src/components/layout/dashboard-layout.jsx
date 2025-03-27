'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children, userRole }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const getNavItems = (role) => {
    const commonItems = [
      { href: '/dashboard/profile', label: 'Profile', icon: 'user' },
      { href: '/dashboard/settings', label: 'Settings', icon: 'cog' }
    ];

    switch (role) {
      case 'student':
        return [
          { href: '/dashboard/student', label: 'My Courses', icon: 'book' },
          { href: '/dashboard/student/progress', label: 'Progress', icon: 'chart' },
          { href: '/dashboard/student/certificates', label: 'Certificates', icon: 'certificate' },
          ...commonItems
        ];
      case 'instructor':
        return [
          { href: '/dashboard/instructor', label: 'My Courses', icon: 'book' },
          { href: '/dashboard/instructor/students', label: 'Students', icon: 'users' },
          { href: '/dashboard/instructor/analytics', label: 'Analytics', icon: 'chart' },
          { href: '/dashboard/instructor/earnings', label: 'Earnings', icon: 'dollar' },
          ...commonItems
        ];
      case 'admin':
        return [
          { href: '/dashboard/admin', label: 'Overview', icon: 'home' },
          { href: '/dashboard/admin/users', label: 'Users', icon: 'users' },
          { href: '/dashboard/admin/courses', label: 'Courses', icon: 'book' },
          { href: '/dashboard/admin/analytics', label: 'Analytics', icon: 'chart' },
          { href: '/dashboard/admin/settings', label: 'Settings', icon: 'cog' }
        ];
      default:
        return commonItems;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  if (!user) {
    return null;
  }

  const navItems = getNavItems(userRole);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
            <Image src="/globe.svg" alt="Logo" width={32} height={32} className="w-8 h-8" />
            <span className="ml-2 text-xl font-bold text-white">Techversity</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-blue-600"
              >
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User */}
          <div className="p-4 border-t">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gray-300" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 w-full px-4 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar toggle */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-lg"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
