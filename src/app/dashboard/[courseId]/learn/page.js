'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { courses } from '@/data/courses';
import Button from '@/components/ui/button';
import { FaPlay, FaCheck } from 'react-icons/fa';

export default function LearningPage() {
  const router = useRouter();
  const params = useParams();
  const [activeLesson, setActiveLesson] = useState(0);
  const [course, setCourse] = useState(null);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const courseData = courses.find(c => c.id === params.courseId);
    if (!courseData) {
      router.push('/dashboard/student');
      return;
    }
    setCourse(courseData);

    // Load completed lessons from localStorage
    const saved = localStorage.getItem(`course_progress_${params.courseId}`);
    if (saved) {
      const { completed, currentLesson } = JSON.parse(saved);
      setCompletedLessons(completed);
      setActiveLesson(currentLesson);
      setProgress((completed.length / courseData.curriculum.length) * 100);
    }
  }, [params.courseId, router]);

  const handleLessonComplete = () => {
    const newCompleted = [...new Set([...completedLessons, activeLesson])];
    setCompletedLessons(newCompleted);
    setProgress((newCompleted.length / course.curriculum.length) * 100);

    // Save progress
    localStorage.setItem(`course_progress_${params.courseId}`, JSON.stringify({
      completed: newCompleted,
      currentLesson: activeLesson
    }));

    // If all lessons completed, show certificate option
    if (newCompleted.length === course.curriculum.length) {
      router.push(`/dashboard/${params.courseId}/certificate`);
    } else {
      // Move to next lesson
      setActiveLesson(prev => Math.min(prev + 1, course.curriculum.length - 1));
    }
  };

  if (!course) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const currentLesson = course.curriculum[activeLesson];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
            <div className="bg-gray-100 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">{currentLesson.title}</h2>
              <div className="aspect-video bg-gray-800 rounded-lg mb-4">
                {/* Video player would go here */}
                <div className="w-full h-full flex items-center justify-center text-white">
                  <FaPlay className="w-16 h-16" />
                </div>
              </div>
              <p className="text-gray-600">{currentLesson.description}</p>
              <Button 
                onClick={handleLessonComplete}
                className="mt-4 bg-blue-600 hover:bg-blue-700"
              >
                Complete & Continue
              </Button>
            </div>
          </div>

          {/* Sidebar - Course Progress */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Course Progress</h3>
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {Math.round(progress)}% Complete
                </p>
              </div>

              {/* Curriculum List */}
              <div className="space-y-2">
                {course.curriculum.map((lesson, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveLesson(index)}
                    className={`w-full text-left p-3 rounded-lg flex items-center space-x-3
                      ${activeLesson === index ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}
                      ${completedLessons.includes(index) ? 'text-green-600' : ''}`}
                  >
                    <span className="flex-shrink-0">
                      {completedLessons.includes(index) ? (
                        <FaCheck className="w-5 h-5 text-green-500" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                      )}
                    </span>
                    <span className="text-sm font-medium">{lesson.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
