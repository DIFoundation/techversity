'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button';
import CourseCurriculum from '@/components/courses/course-curriculum';
import { courses } from '@/data/courses';
import { useCurrency } from '@/contexts/currency-context';

// Get course data based on ID
function getCourseData(id) {
  const courseId = parseInt(id);
  if (isNaN(courseId)) return null;
  return courses.find(course => course.id === courseId);
}

export default function CourseDetail({ params }) {
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState('overview');
  const { formatPrice } = useCurrency();
  
  const unwrappedParams = use(params);
  const courseData = getCourseData(unwrappedParams.courseId);

  if (!courseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">Course not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Content - Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Course Header */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{courseData.title}</h1>
            <p className="text-gray-600 mb-4">{courseData.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <span>Created by </span>
                <span className="font-medium ml-1">{courseData.instructor}</span>
              </div>
              <div className="flex items-center">
                <span>{courseData.level}</span>
              </div>
              <div className="flex items-center">
                <span>{courseData.duration} total hours</span>
              </div>
              <div className="flex items-center">
                <span>{courseData.enrolledStudents?.toLocaleString() || 0} students enrolled</span>
              </div>
              <div className="flex items-center">
                <span>Last updated {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setSelectedSection('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedSection === 'overview'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setSelectedSection('curriculum')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedSection === 'curriculum'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
                }`}
              >
                Curriculum
              </button>
            </nav>
          </div>

          {/* Section Content */}
          <div className="mt-8">
            {selectedSection === 'overview' ? (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">About this course</h3>
                  <p className="text-gray-600">{courseData.about}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">What you&apos;ll learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {courseData.benefits?.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <svg className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    {courseData.requirements?.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Topics covered</h3>
                  <div className="flex flex-wrap gap-2">
                    {courseData.topics?.map((topic, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <CourseCurriculum curriculum={courseData.curriculum || []} />
            )}
          </div>
        </div>

        {/* Course Card - Right Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src={courseData.thumbnail || '/placeholder-course.jpg'}
                alt={courseData.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 space-y-6">
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {formatPrice(courseData.price)}
              </div>
              <Button
                className="w-full"
                onClick={() => router.push('/auth/signup')}
              >
                Enroll Now
              </Button>
              <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {courseData.duration} hours of content
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  {courseData.curriculum?.reduce((total, section) => total + section.lessons.length, 0) || 0} lessons
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Lifetime access
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Certificate of completion
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
