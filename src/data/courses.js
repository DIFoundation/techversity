export const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    description: "Learn full-stack web development from scratch with practical projects",
    about: "This comprehensive bootcamp takes you from absolute beginner to professional web developer. You'll learn modern web development practices, build real-world projects, and gain hands-on experience with the latest technologies. The course covers front-end and back-end development, database management, and deployment strategies. Perfect for those wanting to start a career in web development or enhance their existing skills.",
    benefits: [
      "Build 20+ real-world web applications",
      "Master both front-end and back-end development",
      "Learn the latest frameworks and technologies",
      "Get ready for web developer job interviews",
      "Lifetime access to course updates",
      "Certificate of completion"
    ],
    requirements: [
      "Basic computer knowledge",
      "No prior programming experience needed",
      "A computer with internet connection",
      "Willingness to learn and practice"
    ],
    thumbnail: "/course-thumbnails/web-dev.jpg",
    category: "Web Development",
    price: 1,
    rating: 4.8,
    reviewCount: 1250,
    enrolledStudents: 15420,
    duration: "48h",
    instructor: "John Smith",
    level: "Beginner",
    topics: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    curriculum: [
      {
        title: "Web Development Fundamentals",
        lessons: [
          { title: "Introduction to Web Development", duration: "15m", type: "video", preview: true },
          { title: "Understanding HTML Structure", duration: "25m", type: "video", preview: true },
          { title: "CSS Basics & Styling", duration: "30m", type: "video", preview: false },
          { title: "Building Your First Webpage", duration: "45m", type: "project", preview: false }
        ]
      },
      {
        title: "JavaScript Essentials",
        lessons: [
          { title: "JavaScript Basics", duration: "30m", type: "video", preview: false },
          { title: "DOM Manipulation", duration: "40m", type: "video", preview: false },
          { title: "Event Handling", duration: "35m", type: "video", preview: false },
          { title: "Interactive Website Project", duration: "1h", type: "project", preview: false }
        ]
      },
      {
        title: "Backend Development",
        lessons: [
          { title: "Node.js Introduction", duration: "45m", type: "video", preview: false },
          { title: "Express.js Framework", duration: "50m", type: "video", preview: false },
          { title: "Database Integration", duration: "1h", type: "video", preview: false },
          { title: "Full Stack Project", duration: "2h", type: "project", preview: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        user: "Sarah Johnson",
        rating: 5,
        date: "2025-02-15",
        content: "This course exceeded my expectations! The instructor explains complex concepts in a way that's easy to understand. I went from knowing nothing about web development to building full-stack applications.",
        helpful: 156
      },
      {
        id: 2,
        user: "Michael Chen",
        rating: 5,
        date: "2025-02-01",
        content: "Comprehensive and well-structured course. The projects are practical and helped me build a strong portfolio. I landed my first developer job thanks to this course!",
        helpful: 124
      },
      {
        id: 3,
        user: "Emma Davis",
        rating: 4,
        date: "2025-01-20",
        content: "Great course content and excellent support from the instructor. Would have loved more advanced React topics, but overall it's perfect for beginners.",
        helpful: 89
      }
    ]
  },
  {
    id: 2,
    title: "Business Strategy Fundamentals",
    description: "Master core business concepts and strategic planning",
    about: "Dive deep into the world of business strategy with this comprehensive course. Learn how to analyze markets, develop competitive advantages, and create sustainable business models. This course combines theoretical frameworks with practical case studies from real companies. You'll develop strategic thinking skills essential for business leaders and entrepreneurs in today's dynamic market environment.",
    benefits: [
      "Develop strategic thinking skills",
      "Learn from real business case studies",
      "Create effective business strategies",
      "Network with other business professionals",
      "Access to business templates and tools",
      "Industry-recognized certification"
    ],
    requirements: [
      "Basic understanding of business concepts",
      "Interest in business strategy",
      "English language proficiency",
      "Dedication to complete assignments"
    ],
    thumbnail: "/course-thumbnails/business.jpg",
    category: "Business",
    price: 89.99,
    rating: 4.7,
    reviewCount: 850,
    enrolledStudents: 8750,
    duration: "32h",
    instructor: "Sarah Johnson",
    level: "Intermediate",
    topics: ["Strategic Planning", "Market Analysis", "Business Models"],
    curriculum: [
      {
        title: "Strategic Management Foundations",
        lessons: [
          { title: "Introduction to Strategy", duration: "30m", type: "video", preview: true },
          { title: "Strategic Analysis Tools", duration: "45m", type: "video", preview: true },
          { title: "Case Study: Market Leaders", duration: "1h", type: "case-study", preview: false }
        ]
      },
      {
        title: "Market Analysis",
        lessons: [
          { title: "Understanding Market Forces", duration: "40m", type: "video", preview: false },
          { title: "Competitive Analysis", duration: "45m", type: "video", preview: false },
          { title: "Market Research Methods", duration: "50m", type: "video", preview: false },
          { title: "Market Analysis Project", duration: "1.5h", type: "project", preview: false }
        ]
      },
      {
        title: "Business Model Innovation",
        lessons: [
          { title: "Business Model Canvas", duration: "35m", type: "video", preview: false },
          { title: "Revenue Models", duration: "40m", type: "video", preview: false },
          { title: "Strategy Implementation", duration: "45m", type: "video", preview: false },
          { title: "Final Strategy Project", duration: "2h", type: "project", preview: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        user: "David Wilson",
        rating: 5,
        date: "2025-02-10",
        content: "An excellent introduction to business strategy. The case studies were particularly valuable in understanding how theoretical concepts apply in real-world situations.",
        helpful: 98
      },
      {
        id: 2,
        user: "Lisa Zhang",
        rating: 4,
        date: "2025-01-25",
        content: "Very informative course with practical insights. The templates provided are invaluable for my business planning.",
        helpful: 76
      },
      {
        id: 3,
        user: "James Anderson",
        rating: 5,
        date: "2025-01-15",
        content: "The instructor's real-world experience really shines through. I've already started applying these strategies in my startup.",
        helpful: 67
      }
    ]
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass",
    description: "Create beautiful and user-friendly interfaces",
    about: "Master the art and science of user interface and experience design. This course covers everything from design principles to practical implementation using modern tools. You'll learn how to conduct user research, create wireframes and prototypes, and design intuitive interfaces that users love. Perfect for designers looking to enhance their skills or developers wanting to understand design principles.",
    benefits: [
      "Learn design principles and human-centered design",
      "Master UI/UX design tools like Figma and Sketch",
      "Create user-friendly and accessible interfaces",
      "Develop a portfolio of design projects",
      "Get feedback from experienced designers",
      "Join a community of designers and developers"
    ],
    requirements: [
      "Basic computer skills",
      "Interest in design and user experience",
      "No prior design experience needed",
      "Willingness to learn and practice"
    ],
    thumbnail: "/course-thumbnails/design.jpg",
    category: "Design",
    price: 79.99,
    rating: 4.9,
    reviewCount: 720,
    enrolledStudents: 6840,
    duration: "36h",
    instructor: "Emily Chen",
    level: "All Levels",
    topics: ["UI Design", "UX Research", "Prototyping", "Figma"],
    curriculum: [
      {
        title: "Design Fundamentals",
        lessons: [
          { title: "Introduction to UI/UX", duration: "25m", type: "video", preview: true },
          { title: "Design Principles", duration: "40m", type: "video", preview: true },
          { title: "Color Theory & Typography", duration: "35m", type: "video", preview: false },
          { title: "Basic Design Exercise", duration: "1h", type: "project", preview: false }
        ]
      },
      {
        title: "User Experience Design",
        lessons: [
          { title: "User Research Methods", duration: "45m", type: "video", preview: false },
          { title: "Information Architecture", duration: "40m", type: "video", preview: false },
          { title: "Wireframing Basics", duration: "50m", type: "video", preview: false },
          { title: "UX Research Project", duration: "1.5h", type: "project", preview: false }
        ]
      },
      {
        title: "Prototyping & Testing",
        lessons: [
          { title: "Figma Fundamentals", duration: "45m", type: "video", preview: false },
          { title: "Interactive Prototyping", duration: "50m", type: "video", preview: false },
          { title: "Usability Testing", duration: "40m", type: "video", preview: false },
          { title: "Final Design Project", duration: "2h", type: "project", preview: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        user: "Olivia Brown",
        rating: 5,
        date: "2025-02-12",
        content: "I loved this course! The instructor is knowledgeable and provides clear explanations. The design exercises were challenging but rewarding.",
        helpful: 123
      },
      {
        id: 2,
        user: "William Lee",
        rating: 4,
        date: "2025-01-28",
        content: "Great introduction to UI/UX design. The course covers a lot of ground, but the instructor does a great job of breaking down complex concepts.",
        helpful: 90
      },
      {
        id: 3,
        user: "Sophia Patel",
        rating: 5,
        date: "2025-01-18",
        content: "I was blown away by the quality of this course. The instructor's passion for design shines through, and the feedback from the community was invaluable.",
        helpful: 78
      }
    ]
  },
  {
    id: 4,
    title: "Digital Marketing Strategy",
    description: "Learn modern digital marketing strategies and techniques",
    about: "Transform your marketing skills with this comprehensive digital marketing course. Learn how to create and execute effective digital marketing campaigns across various platforms. From SEO and content marketing to social media strategy and analytics, this course covers all essential aspects of modern digital marketing. You'll work on real campaigns and learn to measure and optimize marketing performance.",
    benefits: [
      "Learn digital marketing fundamentals and strategies",
      "Master SEO, content marketing, and social media marketing",
      "Create and execute effective digital marketing campaigns",
      "Analyze and optimize marketing performance",
      "Get certified in digital marketing",
      "Join a community of marketers and entrepreneurs"
    ],
    requirements: [
      "Basic computer skills",
      "Interest in marketing and business",
      "No prior marketing experience needed",
      "Willingness to learn and practice"
    ],
    thumbnail: "/course-thumbnails/marketing.jpg",
    category: "Marketing",
    price: 69.99,
    rating: 4.6,
    reviewCount: 950,
    enrolledStudents: 12350,
    duration: "24h",
    instructor: "Michael Brown",
    level: "Beginner",
    topics: ["SEO", "Social Media", "Content Marketing", "Analytics"],
    curriculum: [
      {
        title: "Digital Marketing Basics",
        lessons: [
          { title: "Digital Marketing Overview", duration: "30m", type: "video", preview: true },
          { title: "Marketing Channels", duration: "35m", type: "video", preview: true },
          { title: "Target Audience Analysis", duration: "40m", type: "video", preview: false },
          { title: "Marketing Plan Creation", duration: "1h", type: "project", preview: false }
        ]
      },
      {
        title: "Content & SEO",
        lessons: [
          { title: "Content Marketing Strategy", duration: "45m", type: "video", preview: false },
          { title: "SEO Fundamentals", duration: "50m", type: "video", preview: false },
          { title: "Keyword Research", duration: "40m", type: "video", preview: false },
          { title: "SEO Optimization Project", duration: "1.5h", type: "project", preview: false }
        ]
      },
      {
        title: "Social Media Marketing",
        lessons: [
          { title: "Social Media Strategy", duration: "40m", type: "video", preview: false },
          { title: "Content Creation", duration: "45m", type: "video", preview: false },
          { title: "Analytics & Reporting", duration: "35m", type: "video", preview: false },
          { title: "Campaign Project", duration: "2h", type: "project", preview: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        user: "Ava Kim",
        rating: 5,
        date: "2025-02-08",
        content: "This course is a game-changer for anyone looking to get into digital marketing. The instructor is knowledgeable and provides actionable tips.",
        helpful: 145
      },
      {
        id: 2,
        user: "Ethan Hall",
        rating: 4,
        date: "2025-01-22",
        content: "Great introduction to digital marketing. The course covers a lot of ground, but the instructor does a great job of breaking down complex concepts.",
        helpful: 102
      },
      {
        id: 3,
        user: "Liam Chen",
        rating: 5,
        date: "2025-01-12",
        content: "I was impressed by the quality of this course. The instructor's passion for digital marketing shines through, and the feedback from the community was invaluable.",
        helpful: 85
      }
    ]
  },
  {
    id: 5,
    title: "Advanced React Development",
    description: "Master React with advanced patterns and best practices",
    about: "Take your React skills to the next level with this advanced course. Learn professional patterns, performance optimization techniques, and best practices used by top tech companies. You'll dive deep into React's advanced features, state management solutions, testing strategies, and modern development workflows. This course is perfect for developers who want to build scalable and maintainable React applications.",
    benefits: [
      "Master advanced React concepts and patterns",
      "Learn performance optimization techniques",
      "Understand state management solutions like Redux",
      "Develop scalable and maintainable React applications",
      "Get certified in advanced React development",
      "Join a community of experienced React developers"
    ],
    requirements: [
      "Basic understanding of React and JavaScript",
      "Prior experience with React development",
      "Familiarity with modern development tools",
      "Willingness to learn and practice"
    ],
    thumbnail: "/course-thumbnails/react.jpg",
    category: "Web Development",
    price: 109.99,
    rating: 4.9,
    reviewCount: 680,
    enrolledStudents: 5280,
    duration: "40h",
    instructor: "David Wilson",
    level: "Advanced",
    topics: ["React Hooks", "Redux", "Performance", "Testing"],
    curriculum: [
      {
        title: "Advanced React Concepts",
        lessons: [
          { title: "React Internals", duration: "45m", type: "video", preview: true },
          { title: "Advanced Hooks", duration: "50m", type: "video", preview: true },
          { title: "Custom Hooks", duration: "40m", type: "video", preview: false },
          { title: "Hooks Project", duration: "1.5h", type: "project", preview: false }
        ]
      },
      {
        title: "State Management",
        lessons: [
          { title: "Redux Architecture", duration: "45m", type: "video", preview: false },
          { title: "Redux Toolkit", duration: "50m", type: "video", preview: false },
          { title: "State Management Patterns", duration: "40m", type: "video", preview: false },
          { title: "Redux Integration Project", duration: "2h", type: "project", preview: false }
        ]
      },
      {
        title: "Performance & Testing",
        lessons: [
          { title: "Performance Optimization", duration: "40m", type: "video", preview: false },
          { title: "Testing Strategies", duration: "45m", type: "video", preview: false },
          { title: "CI/CD Integration", duration: "35m", type: "video", preview: false },
          { title: "Final Application Project", duration: "2.5h", type: "project", preview: false }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        user: "Julia Kim",
        rating: 5,
        date: "2025-02-05",
        content: "This course is a must-take for any serious React developer. The instructor is knowledgeable and provides actionable tips.",
        helpful: 167
      },
      {
        id: 2,
        user: "Noah Lee",
        rating: 4,
        date: "2025-01-19",
        content: "Great course for advanced React topics. The instructor does a great job of explaining complex concepts in a clear and concise manner.",
        helpful: 119
      },
      {
        id: 3,
        user: "Aiden Hall",
        rating: 5,
        date: "2025-01-09",
        content: "I was impressed by the quality of this course. The instructor's passion for React shines through, and the feedback from the community was invaluable.",
        helpful: 92
      }
    ]
  }
];
