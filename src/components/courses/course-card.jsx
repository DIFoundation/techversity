'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCurrency } from '@/contexts/currency-context';

const CourseCard = ({ id, title, description, price, thumbnail, instructor, duration, enrolledStudents }) => {
  const { formatPrice } = useCurrency();
  return (
    <Link href={`/courses/${id}`} className="block">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900 overflow-hidden transition-transform hover:scale-105">
        <div className="relative h-48">
          <Image
            src={thumbnail || '/placeholder-course.jpg'}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{formatPrice(price)}</span>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {enrolledStudents ? enrolledStudents.toLocaleString() : 0} students
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>{instructor}</span>
            <span className="mx-2">•</span>
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
