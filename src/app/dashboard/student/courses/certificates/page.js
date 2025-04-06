'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { users } from '@/data/users';
import { courses } from '@/data/courses';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [completedCourses, setCompletedCourses] = useState([]);
  const router = useRouter();

  const formatHours = (hours) => {
    if (!hours || isNaN(hours)) return "00:00:00";
  
    const totalSeconds = Math.floor(hours * 3600);
    const hh = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mm = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const ss = String(totalSeconds % 60).padStart(2, "0");
  
    return `${hh}:${mm}:${ss}`;
  };
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Find full user data including enrolled courses
      const fullUserData = users.find(u => u.id === parsedUser.id);
      if (fullUserData) {
        const completedCoursesList = courses.filter(course => 
          fullUserData.completedCourses.includes(course.id)
        );
        setCompletedCourses(completedCoursesList);
      }
    }
  }, []);

  const viewCertificate = (courseId) => {
    router.push(`/dashboard/student/courses/${courseId}/certificate`);
  };

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome {user.name}!</h1>
          <p className="mt-2 text-gray-600">You can continue to download your certificate for the completed course.</p>
        </div>

        {/* Completed Courses */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900">Completed Courses</h2>
          <div className="border-t border-gray-200">
            {completedCourses.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {completedCourses.map((course) => (
                  <div key={course.id} className="p-6 flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 bg-gray-200 rounded-lg">
                        <Image
                          src={course.thumbnail}
                          alt={course.title}
                          width={150}
                          height={150}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{course.instructor}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => viewCertificate(course.id)}
                        className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        Download Certificate
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <p>You haven&apos;t completed any courses yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
