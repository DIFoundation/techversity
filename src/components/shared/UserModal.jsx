'use client';
import { useState, useEffect } from 'react';

export default function UserModal({ isOpen, onClose, user }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-3">
          <p><span className="font-medium">Email:</span> {user.email}</p>
          <p><span className="font-medium">Role:</span> {user.role}</p>
          {user.role === 'student' && (
            <p><span className="font-medium">Enrolled Courses:</span> {user.enrolledCourses?.length || 0}</p>
          )}
          {user.role === 'instructor' && (
            <p><span className="font-medium">Teaching Courses:</span> {user.coursesTeaching?.length || 0}</p>
          )}
          <p><span className="font-medium">Member since:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
