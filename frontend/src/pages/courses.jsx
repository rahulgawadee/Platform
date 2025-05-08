import React from 'react';
import { Link } from 'react-router-dom';

const coursesData = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    instructor: "Rahul Gawade",
    duration: "12 weeks",
    thumbnail: "https://source.unsplash.com/featured/?coding,web",
    level: "Beginner to Advanced",
    description: "Learn to build scalable web applications using HTML, CSS, JavaScript, Node.js, React, and MongoDB.",
  },
  {
    id: 2,
    title: "Data Structures & Algorithms",
    instructor: "Priya Sharma",
    duration: "10 weeks",
    thumbnail: "https://source.unsplash.com/featured/?algorithm,data",
    level: "Intermediate",
    description: "Master problem-solving techniques and prepare for technical interviews with hands-on coding practice.",
  },
  {
    id: 3,
    title: "Machine Learning Basics",
    instructor: "Ankit Verma",
    duration: "8 weeks",
    thumbnail: "https://source.unsplash.com/featured/?machinelearning,ai",
    level: "Beginner",
    description: "Get started with machine learning, covering supervised and unsupervised learning models and real-world projects.",
  },
  {
    id: 4,
    title: "UI/UX Design Fundamentals",
    instructor: "Sana Malik",
    duration: "6 weeks",
    thumbnail: "https://source.unsplash.com/featured/?design,ux",
    level: "All Levels",
    description: "Understand the principles of modern UI/UX design, wireframing, prototyping, and user testing.",
  },
];

const Courses = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-20">
      <h1 className="text-3xl font-bold text-center mb-10">Explore Free Courses</h1>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {coursesData.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
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
                  Start Learning
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;

// Also export data for detail page
export { coursesData };
