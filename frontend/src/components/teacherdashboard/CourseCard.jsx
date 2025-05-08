import React from 'react';
import { FiEdit } from 'react-icons/fi';

const CourseCard = ({ course, type, onPublish, onMoveToDraft, onDelete, onEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-md mx-auto p-4">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-48 object-cover rounded-md"
      />
      <div className="mt-4">
        <h4 className="text-lg font-semibold text-gray-800">{course.title}</h4>
        <p className="text-sm text-gray-600 mt-1">{course.description}</p>

        {type === 'published' && (
          <div className="flex items-center mt-2 text-yellow-500 text-sm">
            <div className="mr-1">★★★★☆</div>
            <span className="text-gray-700">({course.rating})</span>
          </div>
        )}

        {(type === 'ongoing' || type === 'published') && (
          <p className="text-sm text-gray-500 mt-1">
            {course.studentsEnrolled} students enrolled
          </p>
        )}

        <div className="flex flex-wrap gap-2 mt-4">
          {type === 'draft' ? (
            <>
              <button
                onClick={() => onPublish(course.id)}
                className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
              >
                Publish
              </button>
              <button 
                onClick={() => onEdit(course)}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
              >
                <FiEdit />
              </button>
            </>
          ) : (
            <>
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-3 py-1 rounded">
                View
              </button>
              <button
                onClick={() => onEdit(course)}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded"
              >
                <FiEdit />
              </button>
            </>
          )}

          {type === 'draft' && (
            <button
              onClick={() => onDelete(course.id, type)}
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;