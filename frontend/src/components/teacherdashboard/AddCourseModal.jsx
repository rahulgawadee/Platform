import React from "react";
import { FiUpload, FiX, FiPlus, FiCheck } from "react-icons/fi";

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
  setShowAddCourseModal,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = {
      title: newCourse.title,
      description: newCourse.description,
      category: newCourse.category,
      thumbnail_pdf: newCourse.thumbnail_pdf || null,
      modules: newCourse.modules.map((module) => ({
        title: module.title,
        description: module.description || undefined,
        lessons: module.lessons.map((lesson) => ({
          title: lesson.title,
          video_url: lesson.video || undefined,
          duration: lesson.duration || undefined,
          resource_url: lesson.resource || undefined,
          summary: lesson.summary || undefined,
        })),
        quiz:
          module.quiz && module.quiz.questions.length > 0
            ? {
                questions: module.quiz.questions.map((q) => ({
                  question: q.question,
                  options: q.options,
                  correct_answer: q.correctAnswer,
                })),
              }
            : undefined,
      })),
    };

    try {
      const response = await fetch("http://localhost:8000/teacher_courses/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(courseData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(
          "Validation errors from server:",
          JSON.stringify(data, null, 2)
        );
        throw new Error("Course creation failed");
      }

      // ✅ Show success message
      alert("✅ Course created successfully!");

      // (Optional) Clear form or navigate
      // resetForm(); // if you have a reset function
      // navigate("/courses"); // if using react-router
      console.log(data);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create course. See console for details.");
    }
  };

  // Reads PDF file and stores base64 string without prefix
  const onPdfChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const b64 = reader.result.split(",")[1];
      setNewCourse({
        ...newCourse,
        thumbnail_pdf: b64,
        thumbnail_name: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto p-4">
      <div className="bg-white w-full max-w-5xl rounded-lg shadow-lg overflow-hidden">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="flex justify-between items-center bg-gray-50 px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">
              Create New Course
            </h2>
            <button
              type="button"
              onClick={() => setShowAddCourseModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[80vh]">
            {/* Course Basic Info */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Course Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Course Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newCourse.title}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, title: e.target.value })
                    }
                    placeholder="e.g. Advanced JavaScript"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newCourse.category}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, category: e.target.value })
                    }
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="web">Web Development</option>
                    <option value="mobile">Mobile Development</option>
                    <option value="data">Data Science</option>
                    <option value="design">Design</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, description: e.target.value })
                  }
                  placeholder="Describe what students will learn in this course"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Thumbnail PDF Brochure
                </label>
                <div className="flex items-center gap-4">
                  <label className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer">
                    <FiUpload /> Upload PDF
                    <input
                      type="file"
                      onChange={onPdfChange}
                      accept="application/pdf"
                      className="hidden"
                    />
                  </label>
                  {newCourse.thumbnail_name && (
                    <span className="text-sm text-gray-700">
                      {newCourse.thumbnail_name}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">Max file size: 5MB</p>
              </div>
            </div>

            {/* Modules Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-800">
                  Course Modules
                </h3>
                <span className="text-sm text-gray-500">
                  {newCourse.modules.length} module
                  {newCourse.modules.length !== 1 ? "s" : ""} added
                </span>
              </div>

              {newCourse.modules.length > 0 ? (
                <div className="space-y-4 mb-6">
                  {newCourse.modules.map((module, moduleIndex) => (
                    <div
                      key={moduleIndex}
                      className="border border-gray-200 rounded-lg p-4 shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {module.title}
                          </h4>
                          {module.description && (
                            <p className="text-sm text-gray-600 mt-1">
                              {module.description}
                            </p>
                          )}
                        </div>
                      </div>

                      {module.lessons.length > 0 && (
                        <div className="mt-3 pl-4 border-l-2 border-gray-200">
                          <h5 className="text-sm font-medium text-gray-700 mb-2">
                            Lessons:
                          </h5>
                          <ul className="space-y-2">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <li
                                key={lessonIndex}
                                className="text-sm text-gray-600 flex items-start"
                              >
                                <span className="text-gray-500 mr-2">
                                  {lessonIndex + 1}.
                                </span>
                                <span>{lesson.title}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {module.quiz && module.quiz.questions.length > 0 && (
                        <div className="mt-3 pl-4 border-l-2 border-gray-200">
                          <h5 className="text-sm font-medium text-gray-700 mb-1">
                            Quiz
                          </h5>
                          <p className="text-sm text-gray-600">
                            {module.quiz.questions.length} question
                            {module.quiz.questions.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg border border-dashed border-gray-300 p-8 text-center mb-6">
                  <p className="text-gray-500">No modules added yet</p>
                </div>
              )}

              {/* Add Module Form */}
              <div className="bg-gray-50 rounded-lg border p-4">
                <h4 className="font-medium text-gray-800 mb-4">
                  Add New Module
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Module Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={currentModule.title}
                      onChange={(e) =>
                        setCurrentModule({
                          ...currentModule,
                          title: e.target.value,
                        })
                      }
                      placeholder="e.g. Introduction to React"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={2}
                      value={currentModule.description}
                      onChange={(e) =>
                        setCurrentModule({
                          ...currentModule,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe what this module covers"
                    />
                  </div>

                  {/* Add Lesson Form */}
                  <div className="border-t pt-4 mt-4">
                    <h5 className="font-medium text-gray-800 mb-3">
                      Add Lesson
                    </h5>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Lesson Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={currentLesson.title}
                          onChange={(e) =>
                            setCurrentLesson({
                              ...currentLesson,
                              title: e.target.value,
                            })
                          }
                          placeholder="e.g. What is React?"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Video URL
                          </label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={currentLesson.video}
                            onChange={(e) =>
                              setCurrentLesson({
                                ...currentLesson,
                                video: e.target.value,
                              })
                            }
                            placeholder="YouTube or Vimeo URL"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Duration
                          </label>
                          <input
                            type="text"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={currentLesson.duration}
                            onChange={(e) =>
                              setCurrentLesson({
                                ...currentLesson,
                                duration: e.target.value,
                              })
                            }
                            placeholder="e.g. 10:30"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Resource URL
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={currentLesson.resource}
                          onChange={(e) =>
                            setCurrentLesson({
                              ...currentLesson,
                              resource: e.target.value,
                            })
                          }
                          placeholder="PDF or document URL"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Summary
                        </label>
                        <textarea
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows={3}
                          value={currentLesson.summary}
                          onChange={(e) =>
                            setCurrentLesson({
                              ...currentLesson,
                              summary: e.target.value,
                            })
                          }
                          placeholder="Brief summary of the lesson"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={addLesson}
                        disabled={!currentLesson.title}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiPlus />
                        Add Lesson
                      </button>
                    </div>
                  </div>

                  {/* Add Quiz Question */}
                  <div className="border-t pt-4 mt-4">
                    <h5 className="font-medium text-gray-800 mb-3">
                      Add Quiz (Optional)
                    </h5>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Question <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={currentQuizQuestion.question}
                          onChange={(e) =>
                            setCurrentQuizQuestion({
                              ...currentQuizQuestion,
                              question: e.target.value,
                            })
                          }
                          placeholder="Enter the question"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Options <span className="text-red-500">*</span>
                        </label>
                        {currentQuizQuestion.options.map((option, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 mb-2"
                          >
                            <input
                              type="radio"
                              name="correctAnswer"
                              checked={
                                currentQuizQuestion.correctAnswer === index
                              }
                              onChange={() =>
                                setCurrentQuizQuestion({
                                  ...currentQuizQuestion,
                                  correctAnswer: index,
                                })
                              }
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                            />
                            <input
                              type="text"
                              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              value={option}
                              onChange={(e) => {
                                const newOptions = [
                                  ...currentQuizQuestion.options,
                                ];
                                newOptions[index] = e.target.value;
                                setCurrentQuizQuestion({
                                  ...currentQuizQuestion,
                                  options: newOptions,
                                });
                              }}
                              placeholder={`Option ${index + 1}`}
                              required
                            />
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={addQuizQuestion}
                        disabled={
                          !currentQuizQuestion.question ||
                          currentQuizQuestion.options.some((opt) => !opt)
                        }
                        className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiPlus />
                        Add Question
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={addModule}
                    disabled={
                      !currentModule.title || currentModule.lessons.length === 0
                    }
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                  >
                    <FiPlus />
                    Add Module to Course
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer with action buttons */}
          <div className="bg-gray-50 px-6 py-4 border-t flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowAddCourseModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                !newCourse.title ||
                !newCourse.description ||
                newCourse.modules.length === 0
              }
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <FiCheck />
              Create Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
