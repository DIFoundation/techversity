'use client';
import { useState, useEffect } from 'react';
import { users } from '@/data/users';
import { courses } from '@/data/courses';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCurrency } from '@/contexts/currency-context';

export default function StudentProfile() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    // In a real app, this would be fetched from an API
    const currentUser = users.find(user => user.role === 'student');
    setStudent(currentUser);
  }, []);

  if (!student) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-gray-200 rounded-full p-3">
            {
              student.avatar ? (
                <Image
                  width={128}
                  height={128}
                  src={student.avatar} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full" />
              ) : (
                <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )
            }
          </div>
          <div>
            <h1 className="text-2xl font-bold">{student.name}</h1>
            <p className="text-gray-600">{student.email}</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {student.enrolledCourses?.map((courseId) => (
              <div key={courseId} className="border rounded-lg p-4">
                <h3 className="font-medium">Course {courseId}</h3>
                <p className="text-sm text-gray-600">Progress tracking coming soon</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t mt-6 pt-6">
          <h2 className="text-xl font-semibold mb-4">Account Details</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Member since:</span> {new Date(student.createdAt).toLocaleDateString()}</p>
            <p><span className="font-medium">Role:</span> {student.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
