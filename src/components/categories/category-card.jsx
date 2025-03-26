'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const CategoryCard = ({ category }) => {
  return (
    <Link href={`/courses?category=${encodeURIComponent(category.name)}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md dark:shadow-gray-900 p-6 transition-shadow cursor-pointer"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
            <span className="text-3xl">{category.icon}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">{category.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>{category.courseCount} courses</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>{category.studentCount} students</span>
            </div>
          </div>
          <div className="text-blue-600 dark:text-blue-400 font-medium flex items-center hover:text-blue-700 dark:hover:text-blue-300">
            Explore Category
            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
