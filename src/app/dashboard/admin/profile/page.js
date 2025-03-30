'use client';
import { useState, useEffect } from 'react';
import { users } from '@/data/users';
import UserModal from '@/components/shared/UserModal';

export default function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // In a real app, this would be fetched from an API
    const currentUser = users.find(user => user.role === 'admin');
    setAdmin(currentUser);
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  if (!admin) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-gray-200 rounded-full p-3">
            <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold">{admin.name}</h1>
            <p className="text-gray-600">{admin.email}</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">System Users</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {users.map((user) => (
              <div 
                key={user.id} 
                className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => handleUserClick(user)}
              >
                <h3 className="font-medium">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t mt-6 pt-6">
          <h2 className="text-xl font-semibold mb-4">Account Details</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Member since:</span> {new Date(admin.createdAt).toLocaleDateString()}</p>
            <p><span className="font-medium">Role:</span> {admin.role}</p>
          </div>
        </div>
      </div>

      <UserModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={selectedUser}
      />
    </div>
  );
}
