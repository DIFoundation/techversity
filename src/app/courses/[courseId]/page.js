"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import CourseCurriculum from "@/components/courses/course-curriculum";
import { courses } from "@/data/courses";
import { useCurrency } from "@/contexts/currency-context";
import { useParams } from "next/navigation";

// Get course data based on ID
function getCourseData(id) {
  const courseId = parseInt(id);
  if (isNaN(courseId)) return null;
  return courses.find((course) => course.id === courseId);
}

export default function CourseDetail({ params }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [selectedSection, setSelectedSection] = useState("overview");
  const [course, setCourse] = useState(null);

  const { formatPrice } = useCurrency();

  const unwrappedParams = useParams();

  useEffect(() => {
    const foundCourse = courses.find(
      (c) => c.id === parseInt(unwrappedParams.courseId)
    );
    setCourse(foundCourse);

    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [unwrappedParams.courseId]);

  const handleEnroll = () => {
    if (!user) {
      router.push(
        "/auth/login?redirect=" +
          encodeURIComponent("/courses/" + unwrappedParams.courseId)
      );
      return;
    }

    const userCourse = user.enrolledCourses?.includes(course.id);
    if (userCourse) {
      
      router.push(`/dashboard/student?courseId=${course.id}`);
      return;
    }

    if (course.price > 0) {
      router.push(`/payment?courseId=${course.id}`);
    } else {
      // Handle free course enrollment
      router.push(`/dashboard/student?courseId=${course.id}`);
    }
  };

  if (!course) {
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
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-600 mb-4">{course.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <span>Created by </span>
                <span className="font-medium ml-1">{course.instructor}</span>
              </div>
              <div className="flex items-center">
                <span>{course.level}</span>
              </div>
              <div className="flex items-center">
                <span>{course.duration} total hours</span>
              </div>
              <div className="flex items-center">
                <span>
                  {course.enrolledStudents?.toLocaleString() || 0} students
                  enrolled
                </span>
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
                onClick={() => setSelectedSection("overview")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedSection === "overview"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setSelectedSection("curriculum")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedSection === "curriculum"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
                }`}
              >
                Curriculum
              </button>
              <button
                onClick={() => setSelectedSection("reviews")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedSection === "reviews"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
                }`}
              >
                Reviews
              </button>
            </nav>
          </div>

          {/* Section Content */}
          <div className="mt-8">
            {selectedSection === "overview" ? (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    About this course
                  </h3>
                  <p className="text-gray-600">{course.about}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    What you&apos;ll learn
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.benefits?.map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <svg
                          className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600">
                    {course.requirements?.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Topics covered</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.topics?.map((topic, index) => (
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
            ) : selectedSection === "curriculum" ? (
              <CourseCurriculum curriculum={course.curriculum || []} />
            ) : selectedSection === "reviews" ? (
              course.reviews?.map((review) => (
                <div key={review.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center">
                    <Image
                      src={"/user-profile/user.jpg"}
                      alt={review.user}
                      width={40}
                      height={40}
                      className="rounded-full mr-2"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <div className="font-medium">{review.user}</div>
                            <div className="ml-2 flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8 2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {review.date}
                          </div>
                        </div>
                      </div>
                      <p className="mt-2 text-gray-600">{review.content}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No reviews available</p>
            )}
          </div>
        </div>

        {/* Course Card - Right Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src={course.thumbnail || "/placeholder-course.jpg"}
                alt={course.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 space-y-6">
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {formatPrice(course.price)}
              </div>
              <Button className="w-full" onClick={handleEnroll}>
                Enroll Now
              </Button>
              <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {course.duration} hours of content
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                  {course.curriculum?.reduce(
                    (total, section) => total + section.lessons.length,
                    0
                  ) || 0}{" "}
                  lessons
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Lifetime access
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
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
