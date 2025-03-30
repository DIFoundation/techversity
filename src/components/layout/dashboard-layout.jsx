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

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  if (!user) {
    return ('/');
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main content */}
      <div className="">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
