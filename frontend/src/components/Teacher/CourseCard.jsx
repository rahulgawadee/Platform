import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course, category, onPublish, onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    onEdit(course.id, course);
    setIsMenuOpen(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      onDelete(course.id);
    }
    setIsMenuOpen(false);
  };

  const handlePublish = () => {
    onPublish(course.id);
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 relative">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{course.title}</h3>
        <div className="relative">
          <button
            className="text-gray-600 text-xl hover:text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ⋮
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              <button
                onClick={handleEdit}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
              >
                Delete
              </button>
              {category === 'draft' && (
                <button
                  onClick={handlePublish}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-green-600"
                >
                  Publish
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mb-4 text-gray-600">
        <p>{course.description || 'No description provided'}</p>
      </div>

      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <span>{course.modules?.length || 0} Modules</span>
        <span>{course.students || 0} Students</span>
      </div>

      <div className="text-right">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          onClick={() => navigate(`/course/${course.id}`)}
        >
          View Course
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
