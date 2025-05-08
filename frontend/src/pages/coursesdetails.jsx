import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { coursesData } from './courses';

const CourseDetail = () => {
  const { id } = useParams();
  const course = coursesData.find(c => c.id === parseInt(id));

  if (!course) {
    return <div className="text-center mt-10 text-xl text-red-600">Course not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-10">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-64 object-cover rounded-2xl shadow-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <p className="text-gray-600 mb-1">Instructor: {course.instructor}</p>
      <p className="text-gray-600 mb-1">Duration: {course.duration}</p>
      <p className="text-gray-600 mb-1">Level: {course.level}</p>
      <p className="text-lg mt-4 text-gray-800">{course.description}</p>
      <div className="mt-6">
      <Link to={`/course/${course.id}/learn`}>
  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
    Start Learning
  </button>
</Link>

        <Link to="/courses">
          <button className="ml-4 text-blue-600 underline">← Back to Courses</button>
        </Link>
      </div>
    </div>
  );
};

export default CourseDetail;
