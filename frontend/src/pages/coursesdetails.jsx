import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/teacher_courses/${id}`
        );
        setCourse(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-10">Loading course details...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">Error: {error}</div>;
  }

  if (!course) {
    return (
      <div className="text-center mt-10 text-red-600">Course not found.</div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 sm:p-10">
      <img
        src={course.thumbnail_url || "/default-course-image.jpg"}
        alt={course.title}
        className="w-full h-64 object-cover rounded-2xl shadow-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
      <div className="space-y-2 mb-4">
        <p className="text-gray-600">
          <span className="font-semibold">Category:</span> {course.category}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Created:</span>
          {new Date(course.created_at).toLocaleDateString()}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Students:</span>{" "}
          {course.student_count}
        </p>
      </div>
      <p className="text-lg text-gray-800 mb-8">{course.description}</p>

      <div className="mt-6">
        <Link to={`/course/${course.id}/learn`}>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Start Learning
          </button>
        </Link>
        <Link to="/courses" className="ml-4 text-blue-600 hover:underline">
          ← Back to All Courses
        </Link>
      </div>
    </div>
  );
};

export default CourseDetail;
