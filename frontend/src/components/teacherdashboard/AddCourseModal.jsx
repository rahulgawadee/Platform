import React, { useState } from 'react';
import { FiUpload, FiEye, FiEdit2, FiChevronLeft, FiChevronRight, FiX, FiCheck, FiPlus } from 'react-icons/fi';
import { FaChalkboardTeacher, FaBook, FaQuestionCircle } from 'react-icons/fa';

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
  setShowAddCourseModal,
  isEditing
}) => {
  const [activeStep, setActiveStep] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);
  const [editingModuleIndex, setEditingModuleIndex] = useState(null);
  const [editingLessonIndex, setEditingLessonIndex] = useState(null);
  const [editingQuizIndex, setEditingQuizIndex] = useState(null);
  const [currentPreviewModule, setCurrentPreviewModule] = useState(0);

  // Step titles
  const steps = [
    { id: 1, title: 'Course Details', icon: <FaChalkboardTeacher /> },
    { id: 2, title: 'Curriculum', icon: <FaBook /> },
    { id: 3, title: 'Review & Publish', icon: <FiCheck /> }
  ];

  const togglePreview = () => setPreviewMode(!previewMode);

  const handleEditModule = (moduleIndex) => {
    const moduleToEdit = newCourse.modules[moduleIndex];
    setCurrentModule({
      ...moduleToEdit,
      lessons: [],
      quiz: moduleToEdit.quiz || null
    });
    setEditingModuleIndex(moduleIndex);
    setActiveStep(2);
  };

  const handleEditLesson = (moduleIndex, lessonIndex) => {
    const lessonToEdit = newCourse.modules[moduleIndex].lessons[lessonIndex];
    setCurrentLesson(lessonToEdit);
    setEditingModuleIndex(moduleIndex);
    setEditingLessonIndex(lessonIndex);
  };

  const handleEditQuizQuestion = (moduleIndex, questionIndex) => {
    const questionToEdit = newCourse.modules[moduleIndex].quiz.questions[questionIndex];
    setCurrentQuizQuestion(questionToEdit);
    setEditingModuleIndex(moduleIndex);
    setEditingQuizIndex(questionIndex);
  };

  const updateModule = () => {
    const updatedModules = [...newCourse.modules];
    updatedModules[editingModuleIndex] = {
      ...updatedModules[editingModuleIndex],
      title: currentModule.title,
      description: currentModule.description,
      quiz: currentModule.quiz
    };
    setNewCourse({...newCourse, modules: updatedModules});
    resetEditingStates();
  };

  const updateLesson = () => {
    const updatedModules = [...newCourse.modules];
    updatedModules[editingModuleIndex].lessons[editingLessonIndex] = currentLesson;
    setNewCourse({...newCourse, modules: updatedModules});
    resetEditingStates();
  };

  const updateQuizQuestion = () => {
    const updatedModules = [...newCourse.modules];
    updatedModules[editingModuleIndex].quiz.questions[editingQuizIndex] = currentQuizQuestion;
    setNewCourse({...newCourse, modules: updatedModules});
    resetEditingStates();
  };

  const resetEditingStates = () => {
    setEditingModuleIndex(null);
    setEditingLessonIndex(null);
    setEditingQuizIndex(null);
    setCurrentModule({ title: '', description: '', lessons: [], quiz: null });
    setCurrentLesson({ title: '', video: '', duration: '', resource: '', summary: '' });
    setCurrentQuizQuestion({ question: '', options: ['', '', '', ''], correctAnswer: 0 });
  };

  const addNewQuizToModule = (moduleIndex) => {
    const updatedModules = [...newCourse.modules];
    updatedModules[moduleIndex].quiz = {
      title: `${updatedModules[moduleIndex].title} Quiz`,
      questions: []
    };
    setNewCourse({...newCourse, modules: updatedModules});
  };

  const navigatePreviewModule = (direction) => {
    setCurrentPreviewModule(prev => {
      if (direction === 'prev' && prev > 0) return prev - 1;
      if (direction === 'next' && prev < newCourse.modules.length - 1) return prev + 1;
      return prev;
    });
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course Title*</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  placeholder="e.g. Advanced JavaScript Patterns"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={newCourse.category}
                  onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                >
                  <option value="">Select a category</option>
                  <option value="web">Web Development</option>
                  <option value="mobile">Mobile Development</option>
                  <option value="data">Data Science</option>
                  <option value="ai">AI & Machine Learning</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Description*</label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px]"
                value={newCourse.description}
                onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                placeholder="What will students learn in this course?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course Thumbnail</label>
              <div className="flex items-center gap-4">
                <div className="relative w-48 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                  {newCourse.thumbnailPreview ? (
                    <img src={newCourse.thumbnailPreview} alt="Course thumbnail" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <FiUpload className="text-2xl mb-2" />
                      <span className="text-sm">Upload thumbnail</span>
                    </div>
                  )}
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Recommended size: 1280×720px</p>
                  <p className="text-sm text-gray-500">JPG, PNG or GIF (max 2MB)</p>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setShowAddCourseModal(false)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => setActiveStep(2)}
                disabled={!newCourse.title || !newCourse.description || !newCourse.category}
                className={`px-6 py-2 rounded-lg font-medium ${!newCourse.title || !newCourse.description || !newCourse.category ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                Next: Curriculum
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Course Curriculum</h3>
              <button
                onClick={togglePreview}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
              >
                <FiEye /> Preview Course
              </button>
            </div>

            {newCourse.modules.length > 0 && (
              <div className="space-y-4">
                {newCourse.modules.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{module.title}</h4>
                        {module.description && <p className="text-sm text-gray-600">{module.description}</p>}
                      </div>
                      <button
                        onClick={() => handleEditModule(moduleIndex)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Edit module"
                      >
                        <FiEdit2 size={18} />
                      </button>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="px-4 py-3 hover:bg-gray-50 flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                              {lessonIndex + 1}
                            </div>
                            <div>
                              <p className="font-medium text-sm">{lesson.title}</p>
                              {lesson.duration && <p className="text-xs text-gray-500">{lesson.duration}</p>}
                            </div>
                          </div>
                          <button
                            onClick={() => handleEditLesson(moduleIndex, lessonIndex)}
                            className="text-blue-600 hover:text-blue-800 p-1 opacity-0 group-hover:opacity-100"
                            title="Edit lesson"
                          >
                            <FiEdit2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>

                    {module.quiz && (
                      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                            <FaQuestionCircle size={14} />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{module.quiz.title}</p>
                            <p className="text-xs text-gray-500">{module.quiz.questions.length} questions</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setCurrentModule({
                                ...module,
                                lessons: [],
                                quiz: module.quiz
                              });
                              setEditingModuleIndex(moduleIndex);
                            }}
                            className="text-purple-600 hover:text-purple-800 p-1"
                            title="Edit quiz"
                          >
                            <FiEdit2 size={16} />
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="px-4 py-2 border-t border-gray-100 bg-white flex justify-between">
                      <button
                        onClick={() => {
                          setCurrentLesson({ title: '', video: '', duration: '', resource: '', summary: '' });
                          setEditingModuleIndex(moduleIndex);
                          setEditingLessonIndex(null);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <FiPlus size={14} /> Add Lesson
                      </button>
                      {!module.quiz && (
                        <button
                          onClick={() => addNewQuizToModule(moduleIndex)}
                          className="text-sm text-purple-600 hover:text-purple-800 flex items-center gap-1"
                        >
                          <FiPlus size={14} /> Add Quiz
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Module/Lesson/Quiz Form */}
            {(editingModuleIndex !== null || newCourse.modules.length === 0) && (
              <div className="border border-gray-200 rounded-lg p-4 mt-4">
                <h4 className="font-medium text-lg mb-4">
                  {editingModuleIndex !== null ? 'Edit Module' : 'Add New Module'}
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Module Title*</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={currentModule.title}
                      onChange={(e) => setCurrentModule({...currentModule, title: e.target.value})}
                      placeholder="e.g. Getting Started with React"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Module Description</label>
                    <textarea
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
                      value={currentModule.description}
                      onChange={(e) => setCurrentModule({...currentModule, description: e.target.value})}
                      placeholder="What will students learn in this module?"
                    />
                  </div>

                  {/* Lesson Form */}
                  {(editingLessonIndex !== null || (editingModuleIndex !== null && !currentModule.quiz)) && (
                    <div className="border-t pt-4">
                      <h5 className="font-medium mb-3">
                        {editingLessonIndex !== null ? 'Edit Lesson' : 'Add Lesson'}
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Title*</label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={currentLesson.title}
                            onChange={(e) => setCurrentLesson({...currentLesson, title: e.target.value})}
                            placeholder="e.g. Introduction to Components"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={currentLesson.duration}
                            onChange={(e) => setCurrentLesson({...currentLesson, duration: e.target.value})}
                            placeholder="e.g. 12:45"
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={currentLesson.video}
                          onChange={(e) => setCurrentLesson({...currentLesson, video: e.target.value})}
                          placeholder="YouTube or Vimeo embed URL"
                        />
                      </div>
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Resource URL</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={currentLesson.resource}
                          onChange={(e) => setCurrentLesson({...currentLesson, resource: e.target.value})}
                          placeholder="Link to PDF or document"
                        />
                      </div>
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Summary</label>
                        <textarea
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[80px]"
                          value={currentLesson.summary}
                          onChange={(e) => setCurrentLesson({...currentLesson, summary: e.target.value})}
                          placeholder="Key takeaways from this lesson"
                        />
                      </div>
                      <div className="flex justify-end gap-2 mt-4">
                        <button
                          onClick={() => {
                            setCurrentLesson({ title: '', video: '', duration: '', resource: '', summary: '' });
                            setEditingLessonIndex(null);
                          }}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={editingLessonIndex !== null ? updateLesson : addLesson}
                          disabled={!currentLesson.title}
                          className={`px-4 py-2 rounded-lg font-medium ${!currentLesson.title ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                        >
                          {editingLessonIndex !== null ? 'Update Lesson' : 'Add Lesson'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Quiz Form */}
                  {currentModule.quiz && (
                    <div className="border-t pt-4">
                      <h5 className="font-medium mb-3">
                        {editingQuizIndex !== null ? 'Edit Quiz Question' : 'Add Quiz Question'}
                      </h5>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Question*</label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={currentQuizQuestion.question}
                          onChange={(e) => setCurrentQuizQuestion({...currentQuizQuestion, question: e.target.value})}
                          placeholder="Enter the question"
                        />
                      </div>
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Options*</label>
                        {currentQuizQuestion.options.map((option, index) => (
                          <div key={index} className="flex items-center gap-3 mb-2">
                            <input
                              type="radio"
                              name="correctAnswer"
                              checked={currentQuizQuestion.correctAnswer === index}
                              onChange={() => setCurrentQuizQuestion({...currentQuizQuestion, correctAnswer: index})}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <input
                              type="text"
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      <div className="flex justify-end gap-2 mt-4">
                        <button
                          onClick={() => {
                            setCurrentQuizQuestion({ question: '', options: ['', '', '', ''], correctAnswer: 0 });
                            setEditingQuizIndex(null);
                          }}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={editingQuizIndex !== null ? updateQuizQuestion : addQuizQuestion}
                          disabled={!currentQuizQuestion.question || currentQuizQuestion.options.some(opt => !opt)}
                          className={`px-4 py-2 rounded-lg font-medium ${!currentQuizQuestion.question || currentQuizQuestion.options.some(opt => !opt) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
                        >
                          {editingQuizIndex !== null ? 'Update Question' : 'Add Question'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <button
                    onClick={resetEditingStates}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={editingModuleIndex !== null ? updateModule : addModule}
                    disabled={!currentModule.title}
                    className={`px-4 py-2 rounded-lg font-medium ${!currentModule.title ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    {editingModuleIndex !== null ? 'Update Module' : 'Add Module'}
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setActiveStep(1)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Back
              </button>
              <button
                onClick={() => setActiveStep(3)}
                disabled={newCourse.modules.length === 0}
                className={`px-6 py-2 rounded-lg font-medium ${newCourse.modules.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                Next: Review & Publish
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Review Your Course</h3>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  {newCourse.thumbnailPreview && (
                    <div className="w-full md:w-1/3">
                      <img src={newCourse.thumbnailPreview} alt="Course thumbnail" className="w-full rounded-lg" />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-2">{newCourse.title}</h4>
                    <p className="text-gray-600 mb-4">{newCourse.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        {newCourse.category || 'Uncategorized'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h5 className="font-medium mb-3">Course Curriculum</h5>
                  <div className="space-y-4">
                    {newCourse.modules.map((module, moduleIndex) => (
                      <div key={moduleIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 px-4 py-3">
                          <h6 className="font-medium">Module {moduleIndex + 1}: {module.title}</h6>
                          {module.description && <p className="text-sm text-gray-600 mt-1">{module.description}</p>}
                        </div>
                        <div className="divide-y divide-gray-100">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div key={lessonIndex} className="px-4 py-3 flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs">
                                {lessonIndex + 1}
                              </div>
                              <div>
                                <p className="text-sm font-medium">{lesson.title}</p>
                                {lesson.duration && <p className="text-xs text-gray-500">{lesson.duration}</p>}
                              </div>
                            </div>
                          ))}
                        </div>
                        {module.quiz && (
                          <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                              <FaQuestionCircle size={12} />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{module.quiz.title}</p>
                              <p className="text-xs text-gray-500">{module.quiz.questions.length} questions</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <button
                onClick={() => setActiveStep(2)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Back
              </button>
              <button
                onClick={submitCourse}
                disabled={!newCourse.title || newCourse.modules.length === 0}
                className={`px-6 py-2 rounded-lg font-medium ${!newCourse.title || newCourse.modules.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
              >
                {isEditing ? 'Update Course' : 'Publish Course'}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {isEditing ? 'Edit Course' : 'Create New Course'}
          </h2>
          <button
            onClick={() => setShowAddCourseModal(false)}
            className="text-gray-400 hover:text-gray-500"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 pt-4">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 -z-10"></div>
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <button
                  onClick={() => setActiveStep(step.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${activeStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                >
                  {step.icon}
                </button>
                <span className={`text-xs mt-2 ${activeStep >= step.id ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
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
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Back to Editing
                  </button>
                </div>
              )}
            </div>
          ) : (
            renderStepContent()
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCourseModal;