export const users = [
  {
    id: 1,
    email: 'student@techversity.com',
    password: 'student1', // In a real app, passwords should be properly hashed
    name: 'John Doe',
    avatar: '/user-profile/user.jpg',
    role: 'student',
    enrolledCourses: [1, 3],
    completedCourses: [1],
    certificates: [1],
    createdAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 4,
    email: 'adeniranibrahim165@gmail.com',
    password: '111111', // In a real app, passwords should be properly hashed
    name: 'Ibrahim Adeniran',
    avatar: '/user-profile/user.jpg',
    role: 'student',
    enrolledCourses: [1, 3, 5],
    completedCourses: [3, 1],
    certificates: [1, 3],
    createdAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 2,
    email: 'teacher@techversity.com',
    password: 'teacher1',
    name: 'Jane Smith',
    avatar: '/user-profile/user.jpg',
    role: 'instructor',
    coursesTeaching: [1, 3, 5],
    createdAt: '2025-01-10T08:30:00Z'
  },
  {
    id: 3,
    email: 'admin@techversity.com',
    password: 'admin1',
    name: 'Admin User 1',
    avatar: '/user-profile/user.jpg',
    role: 'admin',
    createdAt: '2025-01-01T00:00:00Z'
  }
];
