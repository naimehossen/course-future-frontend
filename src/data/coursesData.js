// src/data/coursesData.js

// মেগা মেনু ডেটা
export const megaMenuData = [
  {
    category: "Cloud Computing",
    subCategories: [
      { name: "Oracle", courses: ["Fusion SCM", "Access Manager", "Identity Manager", "OAF", "Exadata"] },
      { name: "Salesforce", courses: ["Vlocity CPQ", "OmniStudio", "Admin", "Developer", "Marketing Cloud", "CRM", "Sales Cloud"] },
      { name: "Microsoft Azure", courses: ["AZ-104", "AZ-204", "AZ-305", "AZ-400", "AZ-900", "DP-203", "AI-900"] }
    ]
  },
  {
    category: "Cyber Security",
    subCategories: [
      { name: "EC Council", courses: ["CEH V11", "CHFI V9", "CND V2", "Certified SOC Analyst"] },
      { name: "ISO Certifications", courses: ["ISO 27001 Lead Auditor", "ISO 9001 Foundation", "ISO 22301 Lead Implementer"] },
      { name: "CompTIA", courses: ["CompTIA Security+", "CompTIA CySA+", "CompTIA PenTest+"] }
    ]
  },
  {
    category: "ERP & HCM",
    subCategories: [
      { name: "Workday", courses: ["Workday HCM", "Workday Integration", "Workday Finance", "Workday Payroll"] },
      { name: "Netsuite", courses: ["Netsuite Technical", "Netsuite Functional", "Master Selfpaced"] }
    ]
  }
];

// এলোমেলো ডেটা জেনারেটরের জন্য হেল্পার ফাংশন
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// এলোমেলো রেটিং (4.0 - 5.0)
const generateRating = () => {
  const ratings = [4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0];
  return randomItem(ratings);
};

// এলোমেলো স্টুডেন্ট কাউন্ট
const generateStudents = () => {
  const counts = ["500+", "800+", "1.2k+", "1.5k+", "1.8k+", "2k+", "2.5k+", "3k+", "4k+", "5k+"];
  return randomItem(counts);
};

// এলোমেলো ডিউরেশন
const generateDuration = () => {
  const durations = ["20 Hours", "25 Hours", "30 Hours", "35 Hours", "40 Hours", "45 Hours", "50 Hours", "60 Hours"];
  return randomItem(durations);
};

// এলোমেলো লেভেল
const generateLevel = () => {
  const levels = ["Beginner", "Intermediate", "Advanced"];
  return randomItem(levels);
};

// এলোমেলো প্রাইস
const generatePrice = () => {
  const prices = [299, 349, 399, 449, 499, 549, 599, 649, 699, 749, 799];
  return randomItem(prices);
};

// এলোমেলো ইমেজ (picsum.photos ব্যবহার করে)
const generateImage = (seed) => {
  return `https://picsum.photos/seed/${seed}/300/200`;
};

// মেগা মেনু থেকে সব কোর্স জেনারেট করা
const generateAllCourses = () => {
  const allCourses = [];
  let idCounter = 0;

  megaMenuData.forEach((categoryData) => {
    categoryData.subCategories.forEach((subCategory) => {
      subCategory.courses.forEach((courseName) => {
        idCounter++;
        const seed = `course${idCounter}`;
        
        allCourses.push({
          id: idCounter,
          title: courseName,
          category: categoryData.category,
          subCategory: subCategory.name,
          rating: generateRating(),
          students: generateStudents(),
          price: generatePrice(),
          duration: generateDuration(),
          level: generateLevel(),
          image: generateImage(seed),
          description: `Master ${courseName} with comprehensive training from industry experts. This course covers fundamentals to advanced concepts with hands-on projects.`
        });
      });
    });
  });

  return allCourses;
};

// সব কোর্স তৈরি করা
const allCourses = generateAllCourses();

// popularCourses (প্রথম 6 টি)
export const popularCourses = allCourses.slice(0, 6);

// সব কোর্স এক্সপোর্ট করা (ডিফল্ট)
const coursesData = allCourses;
export default coursesData;

// হেল্পার ফাংশন এক্সপোর্ট
export const getAllCourses = () => allCourses;

// স্লাগ থেকে কোর্স খুঁজে বের করা
export const getCourseBySlug = (slug) => {
  return allCourses.find(course => 
    course.title.toLowerCase().replace(/ /g, '-') === slug
  );
};

// ক্যাটাগরি অনুযায়ী কোর্স পাওয়া
export const getCoursesByCategory = (category) => {
  return allCourses.filter(course => 
    course.category.toLowerCase() === category.toLowerCase()
  );
};

// ইনস্ট্রাক্টর ডেটা
export const instructors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Cloud Architecture Expert",
    experience: "15+ Years",
    rating: 4.9,
    students: "5.2k",
    image: "https://picsum.photos/seed/instructor1/150/150",
    specialties: ["AWS", "Azure", "GCP"]
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Cybersecurity Specialist",
    experience: "12+ Years",
    rating: 4.8,
    students: "3.8k",
    image: "https://picsum.photos/seed/instructor2/150/150",
    specialties: ["CEH", "CISSP", "CompTIA"]
  },
  {
    id: 3,
    name: "Priya Patel",
    title: "Data Science & AI Expert",
    experience: "10+ Years",
    rating: 4.9,
    students: "4.5k",
    image: "https://picsum.photos/seed/instructor3/150/150",
    specialties: ["Python", "TensorFlow", "Alteryx"]
  },
  {
    id: 4,
    name: "David Williams",
    title: "ERP & HCM Specialist",
    experience: "18+ Years",
    rating: 4.7,
    students: "6.1k",
    image: "https://picsum.photos/seed/instructor4/150/150",
    specialties: ["Workday", "NetSuite", "SAP"]
  }
];

// ব্লগ পোস্ট ডেটা
export const blogPosts = [
  {
    id: 1,
    title: "Top 10 Cloud Computing Trends in 2026",
    excerpt: "Discover the latest trends shaping the future of cloud computing and how to stay ahead.",
    date: "June 15, 2026",
    category: "Cloud Computing",
    readTime: "5 min read",
    image: "https://picsum.photos/seed/blog1/400/250"
  },
  {
    id: 2,
    title: "How to Prepare for PMP Certification",
    excerpt: "Complete guide to passing PMP exam on your first attempt with proven strategies.",
    date: "June 12, 2026",
    category: "Project Management",
    readTime: "8 min read",
    image: "https://picsum.photos/seed/blog2/400/250"
  },
  {
    id: 3,
    title: "The Future of AI in Education",
    excerpt: "How artificial intelligence is transforming the way we learn and teach.",
    date: "June 10, 2026",
    category: "AI & Technology",
    readTime: "6 min read",
    image: "https://picsum.photos/seed/blog3/400/250"
  }
];

// টেস্টিমোনিয়াল ডেটা
export const testimonials = [
  {
    id: 1,
    name: "Alamara Jamadar",
    role: "Senior Developer",
    company: "TechCorp",
    comment: "The trainer gives knowledge of all topics through practical projects. The hands-on approach made learning so much easier!",
    rating: 5,
    image: "https://picsum.photos/seed/user1/80/80"
  },
  {
    id: 2,
    name: "Paul Aldred",
    role: "IT Manager",
    company: "Global Solutions",
    comment: "The interactive learning framework with direct lab support has been extremely satisfying. Highly recommended!",
    rating: 5,
    image: "https://picsum.photos/seed/user2/80/80"
  },
  {
    id: 3,
    name: "Kalakota V.",
    role: "Cloud Architect",
    company: "CloudTech Inc",
    comment: "Immeasurable enterprise class content. The industry expert tutors have premium subject clarity.",
    rating: 5,
    image: "https://picsum.photos/seed/user3/80/80"
  }
];



export const programs = [
  {
    id: 1,
    title: "Enterprise Cloud Transformation",
    category: "Cloud",
    duration: "3-6 Months",
    level: "Advanced",
    description: "Comprehensive cloud migration and transformation program for enterprise teams.",
    features: ["AWS/Azure/GCP", "DevOps Practices", "Security & Compliance"],
    image: "https://picsum.photos/seed/cloudprogram/400/250"
  },
  {
    id: 2,
    title: "Cybersecurity Excellence Program",
    category: "Security",
    duration: "4-8 Weeks",
    level: "Intermediate",
    description: "Build a robust security culture and implement best practices across your organization.",
    features: ["Threat Detection", "Incident Response", "Compliance Management"],
    image: "https://picsum.photos/seed/securityprogram/400/250"
  },
  {
    id: 3,
    title: "Agile & DevOps Mastery",
    category: "DevOps",
    duration: "2-4 Weeks",
    level: "All Levels",
    description: "Transform your development teams with Agile methodologies and DevOps practices.",
    features: ["Scrum/SAFe", "CI/CD Pipeline", "Automation"],
    image: "https://picsum.photos/seed/devopsprogram/400/250"
  },
  {
    id: 4,
    title: "Data Science & AI for Business",
    category: "Data",
    duration: "6-10 Weeks",
    level: "Intermediate",
    description: "Leverage data science and AI to drive business intelligence and decision making.",
    features: ["Machine Learning", "Data Analytics", "Business Intelligence"],
    image: "https://picsum.photos/seed/dataprogram/400/250"
  }
];


  export const testimonialss = [
    { name: "Sarah Johnson", role: "CTO, TechCorp", comment: "CloudFoundation transformed our entire team. Highly recommended!" },
    { name: "David Chen", role: "VP Engineering, GlobalSoft", comment: "The best corporate training program we've ever invested in." },
    { name: "Priya Patel", role: "Director, DataDrive", comment: "Our team's productivity increased by 60% after the training." }
  ];

  

console.log('Total Courses:', allCourses.length);