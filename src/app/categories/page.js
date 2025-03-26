'use client';

import { useState } from 'react';
import CategoryCard from '@/components/categories/category-card';

const categories = [
  {
    name: "Web Development",
    icon: "💻",
    description: "Learn frontend, backend, and full-stack web development",
    courseCount: 120,
    studentCount: 25000,
    featuredTopics: ["React", "Node.js", "Python", "JavaScript"]
  },
  {
    name: "Data Science",
    icon: "📊",
    description: "Master data analysis, machine learning, and statistics",
    courseCount: 85,
    studentCount: 18000,
    featuredTopics: ["Python", "Machine Learning", "SQL", "Data Analysis"]
  },
  {
    name: "Business",
    icon: "💼",
    description: "Develop business, management, and entrepreneurship skills",
    courseCount: 200,
    studentCount: 45000,
    featuredTopics: ["Marketing", "Finance", "Strategy", "Leadership"]
  },
  {
    name: "Design",
    icon: "🎨",
    description: "Create stunning designs and master creative tools",
    courseCount: 150,
    studentCount: 30000,
    featuredTopics: ["UI/UX", "Graphic Design", "Adobe Suite", "Figma"]
  },
  {
    name: "Marketing",
    icon: "📱",
    description: "Learn digital marketing, SEO, and social media strategies",
    courseCount: 95,
    studentCount: 22000,
    featuredTopics: ["Digital Marketing", "SEO", "Social Media", "Content"]
  },
  {
    name: "Personal Development",
    icon: "🎯",
    description: "Improve productivity, leadership, and life skills",
    courseCount: 180,
    studentCount: 40000,
    featuredTopics: ["Leadership", "Time Management", "Communication", "Goals"]
  },
  {
    name: "Photography",
    icon: "📸",
    description: "Master photography, editing, and visual storytelling",
    courseCount: 75,
    studentCount: 15000,
    featuredTopics: ["Digital Photography", "Editing", "Composition", "Lighting"]
  },
  {
    name: "Music",
    icon: "🎵",
    description: "Learn instruments, music production, and theory",
    courseCount: 90,
    studentCount: 20000,
    featuredTopics: ["Piano", "Guitar", "Production", "Theory"]
  },
  {
    name: "Health & Fitness",
    icon: "💪",
    description: "Achieve your fitness goals and learn about nutrition",
    courseCount: 110,
    studentCount: 28000,
    featuredTopics: ["Workout", "Nutrition", "Yoga", "Mental Health"]
  }
];

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  // Get unique topics from all categories
  const allTopics = [...new Set(categories.flatMap(cat => cat.featuredTopics))].sort();

  // Filter categories based on search and topic
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic = !selectedTopic || category.featuredTopics.includes(selectedTopic);
    return matchesSearch && matchesTopic;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Course Categories</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover a wide range of courses across different categories. Find the perfect course to enhance your skills.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <select
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="">All Topics</option>
          {allTopics.map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No categories found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
}
