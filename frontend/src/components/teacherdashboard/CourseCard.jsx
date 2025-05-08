import React from 'react';
import { FiEdit, FiEye, FiTrash2, FiBook, FiUsers, FiStar } from 'react-icons/fi';

const CourseCard = ({ 
  course, 
  type, 
  onPublish, 
  onMoveToDraft, 
  onDelete, 
  onEdit,
  onView 
}) => {
  // Default handlers if not provided
  const handlePublish = () => {
    if (onPublish) {
      onPublish(course.id);
    } else {
      console.warn('onPublish function not provided');
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(course);
    } else {
      console.warn('onEdit function not provided');
    }
  };

  const handleView = () => {
    if (onView) {
      onView(course);
    } else {
      console.warn('onView function not provided');
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(course.id, type);
    } else {
      console.warn('onDelete function not provided');
    }
  };

  const handleMoveToDraft = () => {
    if (onMoveToDraft) {
      onMoveToDraft(course.id);
    } else {
      console.warn('onMoveToDraft function not provided');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-sm mx-auto transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      {/* Course Thumbnail */}
      <div className="relative">
        <img
          src={course.thumbnail || 'https://via.placeholder.com/400x225?text=Course+Thumbnail'}
          alt={course.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x225?text=Course+Thumbnail';
          }}
        />
        {type === 'published' && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Published
          </span>
        )}
        {type === 'draft' && (
          <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
            Draft
          </span>
        )}
        {type === 'ongoing' && (
          <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
            Ongoing
          </span>
        )}
      </div>

      {/* Course Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{course.description}</p>

        {/* Course Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          {type === 'published' && (
            <div className="flex items-center">
              <FiStar className="text-yellow-400 mr-1" />
              <span className="font-medium text-gray-700">{course.rating || '0.0'}</span>
              <span className="mx-1">•</span>
            </div>
          )}
          {(type === 'ongoing' || type === 'published') && (
            <div className="flex items-center">
              <FiUsers className="mr-1" />
              <span>{course.studentsEnrolled || 0} enrolled</span>
            </div>
          )}
          {type === 'draft' && (
            <div className="flex items-center">
              <FiBook className="mr-1" />
              <span>{course.modules?.length || 0} modules</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {type === 'draft' ? (
            <>
              <button
                onClick={handlePublish}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
              >
                Publish
              </button>
              <button 
                onClick={handleEdit}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
              >
                <FiEdit size={16} /> Edit
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleView}
                className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
              >
                <FiEye size={16} /> View
              </button>
              <button
                onClick={() => {
                  if (type === 'published') {
                    handleMoveToDraft();
                  }
                  handleEdit();
                }}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
              >
                <FiEdit size={16} /> Edit
              </button>
            </>
          )}

          {type === 'draft' && (
            <button
              onClick={handleDelete}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
            >
              <FiTrash2 size={16} /> Delete
            </button>
          )}
        </div>

        {/* Additional Publish Button for Ongoing Courses */}
        {type === 'ongoing' && (
          <button
            onClick={handlePublish}
            className="w-full mt-3 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Publish to Catalog
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseCard;