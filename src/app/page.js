"use client";
import Image from "next/image";
import { courses } from '@/data/courses';
import CategoryCard from "@/components/categories/category-card";
import Link from "next/link";
import { categories } from '@/data/categories';
import { useState } from 'react';
import { useCurrency } from "@/contexts/currency-context";

// Get top 5 categories by course count
const topCategories = [...categories]
  .sort((a, b) => b.courseCount - a.courseCount)
  .slice(0, 5);

// Get top 3 courses
const topCourses = [...courses]
  .sort((a, b) => b.enrollmentCount - a.enrollmentCount)
  .slice(0, 3);

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ courses: [], categories: [] });
  const [showResults, setShowResults] = useState(false);
  const { formatPrice } = useCurrency();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setShowResults(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    
    // Search in courses
    const filteredCourses = courses.filter(course => 
      course.title.toLowerCase().includes(query) || 
      course.description.toLowerCase().includes(query)
    );

    // Search in categories
    const filteredCategories = categories.filter(category =>
      category.name.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query)
    );

    setSearchResults({
      courses: filteredCourses,
      categories: filteredCategories
    });
    setShowResults(true);
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white">
        <h1 className="text-4xl font-bold mb-6">Discover Your Next Skill</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Access thousands of expert-led courses and transform your career</p>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="What do you want to learn today?"
              className="w-full px-6 py-4 bg-white rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {showResults && (searchResults.courses.length > 0 || searchResults.categories.length > 0) ? (
        <section className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">Search Results</h2>
          
          {searchResults.courses.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Courses</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.courses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      width={200}
                      height={200}
                      className="w-full h-auto mb-4"
                    />
                    <Link href={`/courses/${course.id}`}>
                      <h4 className="font-bold text-lg mb-2">{course.title}</h4>
                    </Link>
                    <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                    <Link href={`/courses/${course.id}`} className="text-blue-600 hover:text-blue-700">
                      Learn More →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {searchResults.categories.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Categories</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>
          )}
        </section>
      ) : showResults && (
        <section className="text-center py-8">
          <p className="text-gray-600 text-lg">No results found for &quot;{searchQuery}&quot;</p>
        </section>
      )}

      {!showResults && (
        <>
          {/* Categories Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">Top Course Categories</h2>
                <p className="text-gray-600 mt-1">Explore our most course-rich categories</p>
              </div>
              <Link href="/categories" className="text-blue-600 hover:text-blue-700 flex items-center">
                View All Categories
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {topCategories.map((category) => (
                <CategoryCard key={category.name} category={category} />
              ))}
            </div>
          </section>

          {/* Featured Courses */}
          <section className="bg-gradient-to-b from-blue-50 to-white py-12">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Featured Courses</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Our most popular courses, highly rated by students and professionals
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-stretch">
                {topCourses.map((course) => (
                  <div key={course.id} className="relative">
                    {/* Featured Badge */}
                    <div className="absolute -top-3 -right-3 bg-yellow-400 text-white px-4 py-1 rounded-full z-10 shadow-md">
                      <span className="text-sm font-semibold">Featured</span>
                    </div>
                    
                    {/* Course Card with Enhanced Styling */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                      <div className="relative h-48">
                        <Image
                          src={course.thumbnail || '/placeholder-course.jpg'}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                            {course.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <Link href={`/courses/${course.id}`}>
                          <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
                            {course.title}
                          </h3>
                        </Link>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {course.description}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'fill-current' : 'fill-gray-300'}`}
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                              <span className="ml-2 text-sm text-gray-600">
                                ({course.reviewCount})
                              </span>
                            </div>
                          </div>
                          <span className="text-2xl font-bold text-blue-600">
                            {formatPrice(course.price)}
                          </span>
                        </div>

                        <Link href={`/courses/${course.id}`}>
                          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                            View Course
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link 
                  href="/courses" 
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Browse All Courses
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
