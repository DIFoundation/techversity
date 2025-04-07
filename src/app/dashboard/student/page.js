'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/dashboard-layout';
import { users } from '@/data/users';
import { courses } from '@/data/courses';
import { useCurrency } from '@/contexts/currency-context';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [hoursLearned, setHoursLearned] = useState(0);
  const { formatPrice } = useCurrency();
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
        // Filter out completed courses from enrolled courses
        const activeCourses = courses.filter(course => 
          fullUserData.enrolledCourses.includes(course.id) && 
          !fullUserData.completedCourses.includes(course.id)
        );
        setEnrolledCourses(activeCourses);
        
        const completedCoursesList = courses.filter(course => 
          fullUserData.completedCourses.includes(course.id)
        );
        setCompletedCourses(completedCoursesList);
        
        const certificatesList = courses.filter(course => 
          fullUserData.certificates.includes(course.id)
        );
        setCertificates(certificatesList);

        // Calculate total hours learned
        const totalHours = [...activeCourses, ...completedCoursesList].reduce((total, course) => 
          total + (course.duration || 0), 0
        );
        setHoursLearned(totalHours);
      }
    }
  }, []);

  const handleContinueLearning = (courseId) => {
    router.push(`/dashboard/student/courses/${courseId}/learn`);
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="mt-2 text-gray-600">Continue your learning journey.</p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Courses Enrolled</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">{enrolledCourses.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Hours Learned</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {formatHours(hoursLearned)}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Completed Courses</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {completedCourses.length || 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Certificates Earned</h3>
            <p className="mt-2 text-3xl font-bold text-blue-600">
              {certificates.length || 0}
            </p>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
          </div>
          <div className="border-t border-gray-200">
            {enrolledCourses.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {enrolledCourses.map((course) => (
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
                      <div className="mt-2 flex items-center">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                          <div className="h-2 bg-blue-600 rounded-full" style={{ 
                            width: `${(course.progress || 0) * 100}%`
                           }} />
                        </div>
                        <span className="ml-2 text-sm text-gray-500">
                          {course.earned ? `${(course.progress || 0) * 100}%` : '0%'}
                        </span>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => handleContinueLearning(course.id)}
                        className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
                      >
                        Continue Learning
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <p>You haven&apos;t enrolled in any courses yet.</p>
                <button className="mt-4 px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  <Link href="/courses">
                    Browse Courses
                  </Link>
                </button>
              </div>
            )}
          </div>
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
                    {/* <div className="flex-shrink-0">
                      <button
                        onClick={() => viewCertificate(course.id)}
                        className="px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        Download Certificate
                      </button>
                    </div> */}
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
