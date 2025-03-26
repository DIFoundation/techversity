'use client';

import { useState } from 'react';

const CourseCurriculum = ({ curriculum }) => {
  const [openSection, setOpenSection] = useState(0);

  return (
    <div className="space-y-4">
      {curriculum.map((section, index) => (
        <div key={index} className="border dark:border-gray-700 rounded-lg overflow-hidden">
          <button
            className="w-full px-6 py-4 flex items-center justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => setOpenSection(openSection === index ? -1 : index)}
          >
            <div className="flex items-center">
              <span className="text-lg font-medium text-gray-900 dark:text-gray-100">{section.title}</span>
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                ({section.lessons.length} lessons)
              </span>
            </div>
            <svg
              className={`w-5 h-5 transform transition-transform text-gray-500 dark:text-gray-400 ${
                openSection === index ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          
          {openSection === index && (
            <div className="border-t dark:border-gray-700">
              {section.lessons.map((lesson, lessonIndex) => (
                <div
                  key={lessonIndex}
                  className="px-6 py-4 flex items-center justify-between bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center">
                    <div className="mr-4">
                      {lesson.type === 'video' ? (
                        <svg className="w-5 h-5 text-blue-500 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-green-500 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{lesson.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{lesson.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {lesson.isPreview && (
                      <span className="px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded">
                        Preview
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseCurriculum;
