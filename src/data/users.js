export const users = [
  {
    id: 1,
    email: 'john.doe@example.com',
    password: 'hashed_password_1', // In a real app, passwords should be properly hashed
    name: 'John Doe',
    role: 'student',
    enrolledCourses: [1, 3],
    createdAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 4,
    email: 'adeniranibrahim165@gmail.com',
    password: '111111', // In a real app, passwords should be properly hashed
    name: 'Ibrahim Adeniran',
    role: 'student',
    enrolledCourses: [1, 3, 5],
    createdAt: '2025-01-15T10:00:00Z'
  },
  {
    id: 2,
    email: 'jane.smith@example.com',
    password: 'hashed_password_2',
    name: 'Jane Smith',
    role: 'instructor',
    coursesTeaching: [2, 4],
    createdAt: '2025-01-10T08:30:00Z'
  },
  {
    id: 3,
    email: 'admin@techversity.com',
    password: 'admin_password',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2025-01-01T00:00:00Z'
  }
];
