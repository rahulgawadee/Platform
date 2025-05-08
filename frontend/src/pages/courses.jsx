import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import praktiklyLogo from '../assets/logoPraktikly.png'

const coursesData = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    instructor: "Rahul Gawade",
    duration: "12 weeks",
    thumbnail: "https://source.unsplash.com/featured/?coding,web",
    level: "Beginner to Advanced",
    description: "Learn to build scalable web applications using HTML, CSS, JavaScript, Node.js, React, and MongoDB.",
    status: "completed",
    type: "free"
  },
  {
    id: 2,
    title: "Data Structures & Algorithms",
    instructor: "Priya Sharma",
    duration: "10 weeks",
    thumbnail: "https://source.unsplash.com/featured/?algorithm,data",
    level: "Intermediate",
    description: "Master problem-solving techniques and prepare for technical interviews with hands-on coding practice.",
    status: "remaining",
    type: "free"
  },
  {
    id: 3,
    title: "Machine Learning Basics",
    instructor: "Ankit Verma",
    duration: "8 weeks",
    thumbnail: "https://source.unsplash.com/featured/?machinelearning,ai",
    level: "Beginner",
    description: "Get started with machine learning, covering supervised and unsupervised learning models and real-world projects.",
    status: "remaining",
    type: "free"
  },
  {
    id: 4,
    title: "UI/UX Design Fundamentals",
    instructor: "Sana Malik",
    duration: "6 weeks",
    thumbnail: "https://source.unsplash.com/featured/?design,ux",
    level: "All Levels",
    description: "Understand the principles of modern UI/UX design, wireframing, prototyping, and user testing.",
    status: "completed",
    type: "free"
  },
  {
    id: 5,
    title: "Advanced JavaScript Patterns",
    instructor: "Vikram Patel",
    duration: "6 weeks",
    thumbnail: "https://source.unsplash.com/featured/?javascript,code",
    level: "Advanced",
    description: "Deep dive into JavaScript design patterns, closures, and advanced concepts.",
    status: "remaining",
    type: "free"
  },
  {
    id: 6,
    title: "Cloud Computing with AWS",
    instructor: "Neha Gupta",
    duration: "8 weeks",
    thumbnail: "https://source.unsplash.com/featured/?aws,cloud",
    level: "Intermediate",
    description: "Learn to deploy and manage applications on Amazon Web Services.",
    status: "remaining",
    type: "free"
  },
  {
    id: 7,
    title: "Python for Data Science",
    instructor: "Rajesh Kumar",
    duration: "10 weeks",
    thumbnail: "https://source.unsplash.com/featured/?python,data",
    level: "Beginner",
    description: "Master Python libraries for data analysis and visualization.",
    status: "completed",
    type: "free"
  },
  {
    id: 8,
    title: "Mobile App Development with Flutter",
    instructor: "Arjun Singh",
    duration: "10 weeks",
    thumbnail: "https://source.unsplash.com/featured/?flutter,app",
    level: "Intermediate",
    description: "Build cross-platform mobile applications using Flutter framework.",
    status: "remaining",
    type: "free"
  },
  {
    id: 9,
    title: "DevOps Fundamentals",
    instructor: "Priyanka Joshi",
    duration: "6 weeks",
    thumbnail: "https://source.unsplash.com/featured/?devops,server",
    level: "Intermediate",
    description: "Introduction to CI/CD pipelines, Docker, and Kubernetes.",
    status: "remaining",
    type: "free"
  },
  {
    id: 10,
    title: "Blockchain Basics",
    instructor: "Amit Sharma",
    duration: "8 weeks",
    thumbnail: "https://source.unsplash.com/featured/?blockchain,crypto",
    level: "Beginner",
    description: "Understand the fundamentals of blockchain technology and smart contracts.",
    status: "remaining",
    type: "free"
  },
  {
    id: 11,
    title: "Advanced React Patterns",
    instructor: "Deepika Verma",
    duration: "6 weeks",
    thumbnail: "https://source.unsplash.com/featured/?react,js",
    level: "Advanced",
    description: "Learn advanced React patterns and performance optimization techniques.",
    status: "remaining",
    type: "paid"
  },
  {
    id: 12,
    title: "Cybersecurity Essentials",
    instructor: "Karan Malhotra",
    duration: "8 weeks",
    thumbnail: "https://source.unsplash.com/featured/?cybersecurity,hacking",
    level: "Intermediate",
    description: "Fundamentals of cybersecurity and ethical hacking techniques.",
    status: "remaining",
    type: "paid"
  },
  {
    id: 13,
    title: "iOS Development with Swift",
    instructor: "Nisha Rao",
    duration: "12 weeks",
    thumbnail: "https://source.unsplash.com/featured/?swift,ios",
    level: "Beginner to Advanced",
    description: "Build native iOS applications using Swift programming language.",
    status: "remaining",
    type: "paid"
  },
  {
    id: 14,
    title: "Game Development with Unity",
    instructor: "Rohit Khanna",
    duration: "10 weeks",
    thumbnail: "https://source.unsplash.com/featured/?unity,gaming",
    level: "Intermediate",
    description: "Create 2D and 3D games using Unity game engine.",
    status: "remaining",
    type: "paid"
  }
];

const assignmentsData = [
  {
    id: 1,
    title: "Web Development Project Submission",
    course: "Full-Stack Web Development",
    dueDate: "2023-06-15",
    type: "assignment"
  },
  {
    id: 2,
    title: "DSA Midterm Quiz",
    course: "Data Structures & Algorithms",
    dueDate: "2023-06-20",
    type: "quiz"
  },
  {
    id: 3,
    title: "ML Model Implementation",
    course: "Machine Learning Basics",
    dueDate: "2023-06-25",
    type: "assignment"
  }
];

const announcementsData = [
  {
    id: 1,
    title: "Platform Maintenance",
    content: "Praktikly will be down for maintenance on June 10th from 2:00 AM to 5:00 AM IST.",
    date: "2023-06-05"
  },
  {
    id: 2,
    title: "New Courses Added",
    content: "We've added 5 new courses on advanced topics. Check them out in the courses section!",
    date: "2023-06-01"
  }
];

const Courses = () => {
  const [visibleCourses, setVisibleCourses] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseTypeFilter, setCourseTypeFilter] = useState("free");
  const [goodToKnowFilter, setGoodToKnowFilter] = useState("paid"); // Default to paid for Good to Know
  const [completedCourses, setCompletedCourses] = useState(0);

  useEffect(() => {
    // Calculate completed courses count
    const completed = coursesData.filter(course => course.status === "completed").length;
    setCompletedCourses(completed);
  }, []);

  const handleViewMore = () => {
    setVisibleCourses(prev => prev + 4);
  };

  const filteredCourses = coursesData
    .filter(course => course.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(course => courseTypeFilter === "all" ? true : course.type === courseTypeFilter);

  const goodToKnowCourses = coursesData
    .filter(course => goodToKnowFilter === "all" ? true : course.type === goodToKnowFilter);
  return (
<div className="bg-gray-50 min-h-screen py-6 px-4 sm:px-6 lg:px-20">
      {/* Header Section with Logo */}
      <div className="mb-10 flex items-center bg-blue-500 p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="mr-4">
          <img src={praktiklyLogo} alt="Praktikly" className="h-12" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-1">Welcome back, User!</h1>
          <p className="text-lg text-white">
            Government University of Sweden
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

    
      {/* Courses Section */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Courses</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-10">
        {filteredCourses.slice(0, visibleCourses).map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
          >
            {course.status === "completed" && (
              <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                Completed
              </span>
            )}
            {course.status === "remaining" && (
              <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                Remaining
              </span>
            )}
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-sm text-gray-600 mb-1">By {course.instructor}</p>
              <p className="text-sm text-gray-600 mb-1">Duration: {course.duration}</p>
              <p className="text-sm text-gray-600 mb-4">Level: {course.level}</p>
              <Link to={`/courses/${course.id}`} className="block">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl">
                  {course.status === "completed" ? "Review Course" : "Start Learning"}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {visibleCourses < filteredCourses.length && (
        <div className="text-center mb-12">
          <button
            onClick={handleViewMore}
            className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-6 rounded-lg"
          >
            View More Courses
          </button>
        </div>
      )}

      {/* Upcoming Assignments/Quizzes and Announcements Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Upcoming Assignments/Quizzes */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Upcoming Assignments/Quizzes</h2>
          <div className="space-y-4">
            {assignmentsData.map((item) => (
              <div key={item.id} className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.course}</p>
                <p className="text-sm text-gray-500">
                  Due: {new Date(item.dueDate).toLocaleDateString()} | 
                  <span className={`ml-2 ${item.type === "quiz" ? "text-purple-600" : "text-green-600"}`}>
                    {item.type === "quiz" ? "Quiz" : "Assignment"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Announcements</h2>
          <div className="space-y-4">
            {announcementsData.map((announcement) => (
              <div key={announcement.id} className="pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                <h3 className="font-semibold text-gray-800">{announcement.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{announcement.content}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Posted: {new Date(announcement.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Course Progress */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Course Progress</h2>
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm font-medium text-gray-700">
                {completedCourses} of {coursesData.length} courses
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${(completedCourses / coursesData.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Your Courses:</h3>
            <ul className="space-y-2">
              {coursesData.slice(0, 5).map((course) => (
                <li key={course.id} className="flex items-center">
                  <span className={`inline-block w-2 h-2 rounded-full mr-2 ${course.status === "completed" ? "bg-green-500" : "bg-yellow-500"}`}></span>
                  <span className="text-sm text-gray-700">{course.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Good to Know Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Good to Know</h2>
          <div className="flex space-x-4">
            <button
              className={`px-4 py-1 rounded-lg font-medium ${goodToKnowFilter === "paid" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setGoodToKnowFilter("paid")}
            >
              Paid
            </button>
            <button
              className={`px-4 py-1 rounded-lg font-medium ${goodToKnowFilter === "free" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setGoodToKnowFilter("free")}
            >
              Free
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6" style={{ minWidth: `${goodToKnowCourses.length * 320}px` }}>
              {goodToKnowCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex-shrink-0 w-80 relative"
                >
                  <div className="absolute top-2 right-2 flex space-x-2">
                    {course.type === "paid" && (
                      <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        Paid
                      </span>
                    )}
                    {course.type === "free" && (
                      <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        Free
                      </span>
                    )}
                  </div>
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-5">
                    <h2 className="text-lg font-semibold mb-2">{course.title}</h2>
                    <p className="text-sm text-gray-600 mb-1">By {course.instructor}</p>
                    <p className="text-sm text-gray-600 mb-4">Duration: {course.duration}</p>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl">
                      {course.type === "paid" ? "Enroll Now" : "Start Learning"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;

// Also export data for detail page
export { coursesData, assignmentsData, announcementsData };