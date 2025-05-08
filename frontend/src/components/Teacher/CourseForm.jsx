import React, { useState } from 'react';
import ModuleForm from './ModuleForm';
import DragAndDrop from '../common/DragAndDrop';
import FileUpload from '../common/FileUpload';

const CourseForm = ({ courseData, setCourseData, onSubmit, onCancel }) => {
  const [activeModuleIndex, setActiveModuleIndex] = useState(null);
  const [isModuleFormOpen, setIsModuleFormOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (file) => {
    setCourseData(prev => ({
      ...prev,
      thumbnail: file
    }));
  };

  const handleAddModule = (newModule) => {
    setCourseData(prev => ({
      ...prev,
      modules: [...prev.modules, newModule]
    }));
    setIsModuleFormOpen(false);
  };

  const handleEditModule = (index, updatedModule) => {
    const updatedModules = [...courseData.modules];
    updatedModules[index] = updatedModule;
    setCourseData(prev => ({
      ...prev,
      modules: updatedModules
    }));
    setActiveModuleIndex(null);
  };

  const handleDeleteModule = (index) => {
    const updatedModules = courseData.modules.filter((_, i) => i !== index);
    setCourseData(prev => ({
      ...prev,
      modules: updatedModules
    }));
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Course Title</label>
            <input
              type="text"
              name="title"
              value={courseData.title}
              onChange={handleInputChange}
              placeholder="Enter course title"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
              placeholder="Enter course description"
              rows="4"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={courseData.category}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              <option value="web-development">Web Development</option>
              <option value="data-science">Data Science</option>
              <option value="mobile-development">Mobile Development</option>
              <option value="programming">Programming</option>
              <option value="business">Business</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Course Thumbnail</label>
            <FileUpload onFileUpload={handleFileUpload} acceptedTypes="image/*" />
            {courseData.thumbnail && (
              <div className="mt-2">
                <img
                  src={typeof courseData.thumbnail === 'string'
                    ? courseData.thumbnail
                    : URL.createObjectURL(courseData.thumbnail)}
                  alt="Course thumbnail"
                  className="w-40 h-28 object-cover border rounded"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Course Modules</h3>
            <button
              onClick={() => {
                setActiveModuleIndex(null);
                setIsModuleFormOpen(true);
              }}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              + Add Module
            </button>
          </div>

          <DragAndDrop
            items={courseData.modules}
            onReorder={(reorderedModules) => {
              setCourseData(prev => ({
                ...prev,
                modules: reorderedModules
              }));
            }}
            renderItem={(module, index) => (
              <div className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded mb-2">
                <div>
                  <h4 className="font-medium">{module.title}</h4>
                  <p className="text-sm text-gray-600">{module.lessons?.length || 0} lessons</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setActiveModuleIndex(index);
                      setIsModuleFormOpen(true);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteModule(index)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Create Course
        </button>
      </div>

      {isModuleFormOpen && (
        <ModuleForm
          module={activeModuleIndex !== null ? courseData.modules[activeModuleIndex] : null}
          onClose={() => {
            setIsModuleFormOpen(false);
            setActiveModuleIndex(null);
          }}
          onSubmit={(moduleData) => {
            if (activeModuleIndex !== null) {
              handleEditModule(activeModuleIndex, moduleData);
            } else {
              handleAddModule(moduleData);
            }
          }}
        />
      )}
    </div>
  );
};

export default CourseForm;
