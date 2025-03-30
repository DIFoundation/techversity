'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { users } from '@/data/users';
import { courses } from '@/data/courses';
import { useCurrency } from '@/contexts/currency-context';

export default function InstructorDashboard() {
  const [user, setUser] = useState(null);
  const [teachingCourses, setTeachingCourses] = useState([]);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Find full user data including courses teaching
      const fullUserData = users.find(u => u.id === parsedUser.id);
      if (fullUserData) {
        const instructorCourses = courses.filter(course => 
          fullUserData.coursesTeaching?.includes(course.id)
        );
        setTeachingCourses(instructorCourses);
      }
    }
  }, []);

  if (!user) {
    return null;
  }

  const totalRevenue = teachingCourses.reduce((acc, course) => acc + (course.price * course.enrolledStudents || 0), 0);
  const averageRating = teachingCourses.reduce((acc, course) => acc + (course.rating || 0), 0) / (teachingCourses.length || 1) || 0;
  const completeRate = teachingCourses.reduce((acc, course) => acc + (course.enrolledStudents?.length || 0) / (course.students?.length || 0), 0) / (teachingCourses.length || 1) || 0;
  const enrolledStudents = teachingCourses.reduce((acc, course) => acc + (course.enrolledStudents || 0), 0);

  return (
    <DashboardLayout userRole="instructor">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="mt-2 text-gray-600">Manage your courses and track your performance.</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Total Courses</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">{teachingCourses.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Total Students</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">{enrolledStudents || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Total Earnings</h3>
            <p className="mt-2 text-3xl font-bold text-green-600">{formatPrice(totalRevenue)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Average Rating</h3>
            <p className="mt-2 text-3xl font-bold text-yellow-600">
              {averageRating > 0 ? (averageRating).toFixed(2) : 0}
            </p>
          </div>
        </div>
        
        {/* Course Management */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
            <button className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Create New Course
            </button>
          </div>
          <div className="border-t border-gray-200">
            {teachingCourses.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {teachingCourses.map((course) => (
                  <div key={course.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {course.enrolledStudents || 0} students enrolled
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-semibold text-gray-900">
                          {formatPrice(course.price)}
                        </span>
                        <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50">
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-500">Revenue</h4>
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                          {formatPrice(course.price * (course.enrolledStudents || 0))}
                        </p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-500">Completion Rate</h4>
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                          {completeRate > 0 ? (completeRate).toFixed(2) : 0}%
                        </p>
                      </div>
                      <div className="border rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-500">Average Rating</h4>
                        <p className="mt-1 text-lg font-semibold text-gray-900">
                          {course.rating || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <p>You haven&apos;t created any courses yet.</p>
                <button className="mt-4 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  Create Your First Course
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
