import React from 'react';
import { FiUpload } from 'react-icons/fi';

const AddCourseModal = ({
  newCourse,
  setNewCourse,
  currentModule,
  setCurrentModule,
  currentLesson,
  setCurrentLesson,
  currentQuizQuestion,
  setCurrentQuizQuestion,
  handleFileUpload,
  addModule,
  addLesson,
  addQuizQuestion,
  submitCourse,
  setShowAddCourseModal
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-lg shadow-lg p-6 my-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Create New Course</h2>
          <button onClick={() => setShowAddCourseModal(false)} className="text-2xl font-bold text-gray-500 hover:text-red-500">✕</button>
        </div>

        {/* Course Title & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Course Title*</label>
            <input 
              type="text"
              className="w-full border rounded px-3 py-2"
              value={newCourse.title}
              onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
              placeholder="e.g. Advanced JavaScript"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select 
              className="w-full border rounded px-3 py-2"
              value={newCourse.category}
              onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
            >
              <option value="">Select a category</option>
              <option value="web">Web Development</option>
              <option value="mobile">Mobile Development</option>
              <option value="data">Data Science</option>
              <option value="design">Design</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Description*</label>
          <textarea 
            className="w-full border rounded px-3 py-2"
            value={newCourse.description}
            onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
            placeholder="Describe what students will learn in this course"
          />
        </div>

        {/* Thumbnail Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Thumbnail</label>
          <div className="flex items-start gap-4">
            {newCourse.thumbnailPreview ? (
              <img src={newCourse.thumbnailPreview} alt="Course thumbnail" className="w-40 h-24 object-cover rounded border" />
            ) : (
              <div className="w-40 h-24 flex items-center justify-center border rounded bg-gray-100 text-gray-500">
                Thumbnail preview
              </div>
            )}
            <div>
              <label className="cursor-pointer inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                <FiUpload />
                Upload Image
                <input type="file" onChange={handleFileUpload} accept="image/*" className="hidden" />
              </label>
              <p className="text-xs text-gray-500 mt-1">Recommended size: 1280x720px</p>
            </div>
          </div>
        </div>

        {/* Modules List */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Course Modules</h3>
          {newCourse.modules.length > 0 && (
            <div className="space-y-4">
              {newCourse.modules.map((module, moduleIndex) => (
                <div key={moduleIndex} className="border p-4 rounded shadow-sm">
                  <div className="mb-2">
                    <h4 className="font-medium text-md">{module.title}</h4>
                    <p className="text-sm text-gray-600">{module.description}</p>
                  </div>
                  {module.lessons.length > 0 && (
                    <div className="ml-4">
                      <h5 className="font-semibold text-sm mt-2">Lessons:</h5>
                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <li key={lessonIndex}>
                            {lessonIndex + 1}. {lesson.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {module.quiz && (
                    <div className="mt-2 ml-4">
                      <h5 className="font-semibold text-sm">Quiz: {module.quiz.title}</h5>
                      <p className="text-sm text-gray-600">{module.quiz.questions.length} questions</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Module Form */}
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-2">Add New Module</h4>

          {/* Module Title and Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Module Title*</label>
            <input 
              type="text"
              className="w-full border rounded px-3 py-2"
              value={currentModule.title}
              onChange={(e) => setCurrentModule({...currentModule, title: e.target.value})}
              placeholder="e.g. Introduction to React"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea 
              className="w-full border rounded px-3 py-2"
              value={currentModule.description}
              onChange={(e) => setCurrentModule({...currentModule, description: e.target.value})}
              placeholder="Describe what this module covers"
            />
          </div>

          {/* Add Lesson Form */}
          <div className="mb-4">
            <h5 className="font-medium mb-2">Add Lesson</h5>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Lesson Title*</label>
              <input 
                type="text"
                className="w-full border rounded px-3 py-2"
                value={currentLesson.title}
                onChange={(e) => setCurrentLesson({...currentLesson, title: e.target.value})}
                placeholder="e.g. What is React?"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <div>
                <label className="block text-sm font-medium mb-1">Video URL</label>
                <input 
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={currentLesson.video}
                  onChange={(e) => setCurrentLesson({...currentLesson, video: e.target.value})}
                  placeholder="YouTube or Vimeo URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Duration</label>
                <input 
                  type="text"
                  className="w-full border rounded px-3 py-2"
                  value={currentLesson.duration}
                  onChange={(e) => setCurrentLesson({...currentLesson, duration: e.target.value})}
                  placeholder="e.g. 10:30"
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Resource URL</label>
              <input 
                type="text"
                className="w-full border rounded px-3 py-2"
                value={currentLesson.resource}
                onChange={(e) => setCurrentLesson({...currentLesson, resource: e.target.value})}
                placeholder="PDF or document URL"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Summary</label>
              <textarea 
                className="w-full border rounded px-3 py-2"
                value={currentLesson.summary}
                onChange={(e) => setCurrentLesson({...currentLesson, summary: e.target.value})}
                placeholder="Brief summary of the lesson"
              />
            </div>
            <button onClick={addLesson} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-2">
              Add Lesson
            </button>
          </div>

          {/* Add Quiz Question */}
          <div className="mb-4">
            <h5 className="font-medium mb-2">Add Quiz (Optional)</h5>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Question*</label>
              <input 
                type="text"
                className="w-full border rounded px-3 py-2"
                value={currentQuizQuestion.question}
                onChange={(e) => setCurrentQuizQuestion({...currentQuizQuestion, question: e.target.value})}
                placeholder="Enter the question"
              />
            </div>
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Options*</label>
              {currentQuizQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2 mb-1">
                  <input 
                    type="radio"
                    name="correctAnswer"
                    checked={currentQuizQuestion.correctAnswer === index}
                    onChange={() => setCurrentQuizQuestion({...currentQuizQuestion, correctAnswer: index})}
                  />
                  <input 
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...currentQuizQuestion.options];
                      newOptions[index] = e.target.value;
                      setCurrentQuizQuestion({...currentQuizQuestion, options: newOptions});
                    }}
                    placeholder={`Option ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            <button onClick={addQuizQuestion} className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 mt-2">
              Add Question
            </button>
          </div>

          <button onClick={addModule} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Module to Course
          </button>
        </div>

        {/* Final Actions */}
        <div className="flex justify-end gap-4">
          <button onClick={() => setShowAddCourseModal(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button 
            onClick={submitCourse}
            disabled={!newCourse.title || newCourse.modules.length === 0}
            className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-purple-700"
          >
            Create Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourseModal;
