'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { users } from '@/data/users';
import { courses } from '@/data/courses';
import { useCurrency } from '@/contexts/currency-context';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return null;
  }

  const totalStudents = users.filter(u => u.role === 'student').length;
  const totalInstructors = users.filter(u => u.role === 'instructor').length;
  const totalAdmin = users.filter(u => u.role === 'admin').length
  const totalRevenue = courses.reduce((acc, course) => {
    return acc + ((course.price || 0) * (course.enrolledStudents?.length || 0));
  }, 0);

  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Platform overview and management.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">{users.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Total Courses</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">{courses.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Total Revenue</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">{formatPrice(totalRevenue)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Active Users</h3>
            <p className="mt-2 text-3xl font-bold text-purple-600">{users.length}</p>
          </div>
        </div>

        {/* User Distribution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">User Distribution</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Students</span>
                  <span className="text-sm font-medium text-gray-700">{totalStudents}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full"
                    style={{ width: `${(totalStudents / users.length) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Instructors</span>
                  <span className="text-sm font-medium text-gray-700">{totalInstructors}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-green-600 rounded-full"
                    style={{ width: `${(totalInstructors / users.length) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Admin</span>
                  <span className="text-sm font-medium text-gray-700">{totalAdmin}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-red-600 rounded-full"
                    style={{ width: `${(totalAdmin / users.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                <span className="text-sm text-gray-600">New user registration</span>
                <span className="ml-auto text-sm text-gray-500">
                  2mins ago
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                <span className="text-sm text-gray-600">New course published</span>
                <span className="ml-auto text-sm text-gray-500">1h ago</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                <span className="text-sm text-gray-600">Course review submitted</span>
                <span className="ml-auto text-sm text-gray-500">3h ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 text-left border rounded-lg hover:bg-gray-50">
              <h3 className="font-semibold text-gray-900">Manage Users</h3>
              <p className="mt-1 text-sm text-gray-500">Add, edit, or remove users</p>
            </button>
            <button className="p-4 text-left border rounded-lg hover:bg-gray-50">
              <h3 className="font-semibold text-gray-900">Review Courses</h3>
              <p className="mt-1 text-sm text-gray-500">Approve or reject new courses</p>
            </button>
            <button className="p-4 text-left border rounded-lg hover:bg-gray-50">
              <h3 className="font-semibold text-gray-900">System Settings</h3>
              <p className="mt-1 text-sm text-gray-500">Configure platform settings</p>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
