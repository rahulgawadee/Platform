import React, { useState } from 'react';
import { FiUpload, FiEye, FiEdit2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

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
  const [previewMode, setPreviewMode] = useState(false);
  const [editingModuleIndex, setEditingModuleIndex] = useState(null);
  const [editingLessonIndex, setEditingLessonIndex] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(false);
  const [currentPreviewModule, setCurrentPreviewModule] = useState(0);

  const togglePreview = () => {
    setPreviewMode(!previewMode);
    setCurrentPreviewModule(0);
  };

  const handleEditModule = (moduleIndex) => {
    const moduleToEdit = newCourse.modules[moduleIndex];
    setCurrentModule({
      title: moduleToEdit.title,
      description: moduleToEdit.description,
      lessons: [],
      quiz: null
    });
    setEditingModuleIndex(moduleIndex);
    setEditingLessonIndex(null);
    setEditingQuiz(false);
  };

  const handleEditLesson = (moduleIndex, lessonIndex) => {
    const lessonToEdit = newCourse.modules[moduleIndex].lessons[lessonIndex];
    setCurrentLesson({
      title: lessonToEdit.title,
      video: lessonToEdit.video,
      duration: lessonToEdit.duration,
      resource: lessonToEdit.resource,
      summary: lessonToEdit.summary
    });
    setEditingModuleIndex(moduleIndex);
    setEditingLessonIndex(lessonIndex);
  };

  const handleEditQuiz = (moduleIndex) => {
    const moduleToEdit = newCourse.modules[moduleIndex];
    if (moduleToEdit.quiz) {
      setCurrentQuizQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      });
      setEditingModuleIndex(moduleIndex);
      setEditingQuiz(true);
    }
  };

  const updateModule = () => {
    const updatedModules = [...newCourse.modules];
    updatedModules[editingModuleIndex] = {
      ...updatedModules[editingModuleIndex],
      title: currentModule.title,
      description: currentModule.description
    };
    setNewCourse({...newCourse, modules: updatedModules});
    setEditingModuleIndex(null);
    setCurrentModule({ title: '', description: '', lessons: [], quiz: null });
  };

  const updateLesson = () => {
    const updatedModules = [...newCourse.modules];
    updatedModules[editingModuleIndex].lessons[editingLessonIndex] = {
      ...currentLesson
    };
    setNewCourse({...newCourse, modules: updatedModules});
    setEditingLessonIndex(null);
    setCurrentLesson({ title: '', video: '', duration: '', resource: '', summary: '' });
  };

  const navigatePreviewModule = (direction) => {
    setCurrentPreviewModule(prev => {
      if (direction === 'prev' && prev > 0) return prev - 1;
      if (direction === 'next' && prev < newCourse.modules.length - 1) return prev + 1;
      return prev;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-lg shadow-lg p-6 my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">
            {previewMode ? 'Course Preview' : 'Create New Course'}
          </h2>
          <div className="flex items-center gap-4">
            {!previewMode && (
              <button 
                onClick={togglePreview}
                className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded hover:bg-blue-200"
              >
                <FiEye /> Preview
              </button>
            )}
            <button 
              onClick={() => setShowAddCourseModal(false)} 
              className="text-2xl font-bold text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          </div>
        </div>

        {previewMode ? (
          <div className="preview-content">
            {newCourse.modules.length > 0 ? (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">
                    Module {currentPreviewModule + 1}: {newCourse.modules[currentPreviewModule].title}
                  </h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => navigatePreviewModule('prev')}
                      disabled={currentPreviewModule === 0}
                      className="p-2 rounded-full bg-gray-100 disabled:opacity-50 hover:bg-gray-200"
                    >
                      <FiChevronLeft />
                    </button>
                    <button 
                      onClick={() => navigatePreviewModule('next')}
                      disabled={currentPreviewModule === newCourse.modules.length - 1}
                      className="p-2 rounded-full bg-gray-100 disabled:opacity-50 hover:bg-gray-200"
                    >
                      <FiChevronRight />
                    </button>
                  </div>
                </div>

                <div className="mb-6 p-4 border rounded">
                  <p className="text-gray-700 mb-4">{newCourse.modules[currentPreviewModule].description}</p>
                  
                  <h4 className="font-semibold mb-3">Lessons:</h4>
                  <ul className="space-y-3">
                    {newCourse.modules[currentPreviewModule].lessons.map((lesson, index) => (
                      <li key={index} className="p-3 border rounded hover:bg-gray-50">
                        <div className="font-medium">{lesson.title}</div>
                        {lesson.duration && <div className="text-sm text-gray-500">Duration: {lesson.duration}</div>}
                        {lesson.summary && <div className="text-sm mt-1">{lesson.summary}</div>}
                      </li>
                    ))}
                  </ul>

                  {newCourse.modules[currentPreviewModule].quiz && (
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3">Quiz: {newCourse.modules[currentPreviewModule].quiz.title}</h4>
                      <div className="space-y-4">
                        {newCourse.modules[currentPreviewModule].quiz.questions.map((q, qIndex) => (
                          <div key={qIndex} className="p-3 border rounded">
                            <div className="font-medium mb-2">{q.question}</div>
                            <ul className="space-y-2">
                              {q.options.map((opt, optIndex) => (
                                <li 
                                  key={optIndex}
                                  className={`p-2 border rounded ${q.correctAnswer === optIndex ? 'bg-green-50 border-green-200' : ''}`}
                                >
                                  {opt}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button 
                    onClick={togglePreview}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Back to Editing
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No modules added yet</p>
                <button 
                  onClick={togglePreview}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Back to Editing
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Course Basic Info */}
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
                    <div key={moduleIndex} className="border p-4 rounded shadow-sm relative">
                      <div className="absolute top-2 right-2 flex gap-2">
                        <button 
                          onClick={() => handleEditModule(moduleIndex)}
                          className="p-1 text-blue-600 hover:text-blue-800"
                          title="Edit module"
                        >
                          <FiEdit2 size={16} />
                        </button>
                      </div>
                      <div className="mb-2">
                        <h4 className="font-medium text-md">{module.title}</h4>
                        <p className="text-sm text-gray-600">{module.description}</p>
                      </div>
                      {module.lessons.length > 0 && (
                        <div className="ml-4 mt-3">
                          <h5 className="font-semibold text-sm mb-2">Lessons:</h5>
                          <ul className="space-y-2">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <li key={lessonIndex} className="flex justify-between items-center group">
                                <span>
                                  {lessonIndex + 1}. {lesson.title}
                                </span>
                                <button 
                                  onClick={() => handleEditLesson(moduleIndex, lessonIndex)}
                                  className="opacity-0 group-hover:opacity-100 p-1 text-blue-600 hover:text-blue-800"
                                  title="Edit lesson"
                                >
                                  <FiEdit2 size={14} />
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {module.quiz && (
                        <div className="mt-3 ml-4 flex justify-between items-center">
                          <div>
                            <h5 className="font-semibold text-sm">Quiz: {module.quiz.title}</h5>
                            <p className="text-sm text-gray-600">{module.quiz.questions.length} questions</p>
                          </div>
                          <button 
                            onClick={() => handleEditQuiz(moduleIndex)}
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                          >
                            <FiEdit2 size={14} /> Edit
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add/Edit Module Form */}
            <div className="mb-6">
              <h4 className="text-md font-semibold mb-2">
                {editingModuleIndex !== null ? 'Edit Module' : 'Add New Module'}
              </h4>

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

              {/* Add/Edit Lesson Form */}
              <div className="mb-4 border-t pt-4">
                <h5 className="font-medium mb-2">
                  {editingLessonIndex !== null ? 'Edit Lesson' : 'Add Lesson'}
                </h5>
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
                <div className="flex gap-2">
                  {editingLessonIndex !== null ? (
                    <>
                      <button 
                        onClick={updateLesson} 
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      >
                        Update Lesson
                      </button>
                      <button 
                        onClick={() => {
                          setEditingLessonIndex(null);
                          setCurrentLesson({ title: '', video: '', duration: '', resource: '', summary: '' });
                        }} 
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={addLesson} 
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Add Lesson
                    </button>
                  )}
                </div>
              </div>

              {/* Add/Edit Quiz Question */}
              <div className="mb-4 border-t pt-4">
                <h5 className="font-medium mb-2">
                  {editingQuiz ? 'Edit Quiz' : 'Add Quiz (Optional)'}
                </h5>
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
                <div className="flex gap-2">
                  <button 
                    onClick={addQuizQuestion} 
                    className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                  >
                    {editingQuiz ? 'Update Question' : 'Add Question'}
                  </button>
                  {editingQuiz && (
                    <button 
                      onClick={() => {
                        setEditingQuiz(false);
                        setCurrentQuizQuestion({
                          question: '',
                          options: ['', '', '', ''],
                          correctAnswer: 0
                        });
                      }} 
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                {editingModuleIndex !== null ? (
                  <>
                    <button 
                      onClick={updateModule} 
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Update Module
                    </button>
                    <button 
                      onClick={() => {
                        setEditingModuleIndex(null);
                        setCurrentModule({ title: '', description: '', lessons: [], quiz: null });
                      }} 
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={addModule} 
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Add Module to Course
                  </button>
                )}
              </div>
            </div>

            {/* Final Actions */}
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setShowAddCourseModal(false)} 
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button 
                onClick={submitCourse}
                disabled={!newCourse.title || newCourse.modules.length === 0}
                className="bg-purple-600 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-purple-700"
              >
                {newCourse.status === 'draft' ? 'Update Course' : 'Create Course'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddCourseModal;