'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CourseCard from '@/components/courses/course-card';
import CourseFilters from '@/components/courses/course-filters';
import { courses } from '@/data/courses';

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [sortBy, setSortBy] = useState('popular');

  useEffect(() => {
    if (categoryParam) {
      setFilteredCourses(courses.filter(course => course.category === categoryParam));
    } else {
      setFilteredCourses(courses);
    }
  }, [categoryParam]);

  const handleFilterChange = (filters) => {
    let filtered = [...courses];

    // Apply category filter
    if (filters.category && filters.category !== 'All Categories') {
      filtered = filtered.filter(course => course.category === filters.category);
    }

    // Apply price range filter
    if (filters.priceRange) {
      filtered = filtered.filter(course => {
        switch (filters.priceRange) {
          case 'free':
            return course.price === 0;
          case 'under-50':
            return course.price < 50;
          case '50-100':
            return course.price >= 50 && course.price <= 100;
          case 'over-100':
            return course.price > 100;
          default:
            return true;
        }
      });
    }

    // Apply rating filter
    if (filters.rating) {
      filtered = filtered.filter(course => course.rating >= parseFloat(filters.rating));
    }

    // Apply duration filter
    if (filters.duration) {
      filtered = filtered.filter(course => {
        const hours = parseInt(course.duration);
        switch (filters.duration) {
          case 'short':
            return hours < 5;
          case 'medium':
            return hours >= 5 && hours <= 20;
          case 'long':
            return hours > 20;
          default:
            return true;
        }
      });
    }

    setFilteredCourses(filtered);
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
    let sorted = [...filteredCourses];

    switch (sortType) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        sorted.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    setFilteredCourses(sorted);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <CourseFilters onFilterChange={handleFilterChange} />
        </div>
        <div className="w-full md:w-3/4">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              {categoryParam ? `${categoryParam} Courses` : 'All Courses'}
            </h1>
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard 
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                price={course.price}
                thumbnail={course.thumbnail}
                instructor={course.instructor}
                duration={course.duration}
                enrolledStudents={course.enrolledStudents}
              />
            ))}
          </div>
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
