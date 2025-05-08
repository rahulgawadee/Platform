import React, { useState } from 'react';
import CourseForm from './CourseForm';

const AddCourseModal = ({ onClose, onSubmit }) => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    thumbnail: null,
    modules: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCourse = {
      ...courseData,
      id: `course-${Date.now()}`,
      createdAt: new Date().toISOString(),
      students: 0
    };
    onSubmit(newCourse);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 relative">
        <div className="flex items-center justify-between mb-4 border-b pb-2">
          <h2 className="text-2xl font-semibold text-gray-800">Create New Course</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl font-bold"
          >
            &times;
          </button>
        </div>

        <div>
          <CourseForm 
            courseData={courseData}
            setCourseData={setCourseData}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default AddCourseModal;
