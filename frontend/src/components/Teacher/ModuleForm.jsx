import React, { useState } from 'react';
import LessonForm from './LessonForm';
import QuizForm from './QuizForm';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const ModuleForm = ({ module, onClose, onSubmit }) => {
  const [moduleData, setModuleData] = useState(module || {
    id: `module-${Date.now()}`,
    title: '',
    description: '',
    lessons: [],
    quiz: null
  });

  const [activeLessonIndex, setActiveLessonIndex] = useState(null);
  const [isLessonFormOpen, setIsLessonFormOpen] = useState(false);
  const [isQuizFormOpen, setIsQuizFormOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModuleData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddLesson = (newLesson) => {
    setModuleData(prev => ({
      ...prev,
      lessons: [...prev.lessons, newLesson]
    }));
    setIsLessonFormOpen(false);
  };

  const handleEditLesson = (index, updatedLesson) => {
    const updatedLessons = [...moduleData.lessons];
    updatedLessons[index] = updatedLesson;
    setModuleData(prev => ({
      ...prev,
      lessons: updatedLessons
    }));
    setActiveLessonIndex(null);
    setIsLessonFormOpen(false);
  };

  const handleDeleteLesson = (index) => {
    const updatedLessons = moduleData.lessons.filter((_, i) => i !== index);
    setModuleData(prev => ({
      ...prev,
      lessons: updatedLessons
    }));
  };

  const handleQuizSubmit = (quizData) => {
    setModuleData(prev => ({
      ...prev,
      quiz: quizData
    }));
    setIsQuizFormOpen(false);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(moduleData.lessons);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setModuleData(prev => ({
      ...prev,
      lessons: items
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(moduleData);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {module ? 'Edit Module' : 'Create New Module'}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
        >
          &times;
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Module Title */}
        <div>
          <label className="block text-sm font-medium mb-1">Module Title</label>
          <input
            type="text"
            name="title"
            value={moduleData.title}
            onChange={handleInputChange}
            placeholder="Enter module title"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={moduleData.description}
            onChange={handleInputChange}
            placeholder="Enter module description"
            rows="4"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Lessons Section */}
        <div className="border border-gray-200 rounded p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Lessons</h3>
            <button
              type="button"
              onClick={() => {
                setActiveLessonIndex(null);
                setIsLessonFormOpen(true);
              }}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              + Add Lesson
            </button>
          </div>

          {moduleData.lessons.length > 0 ? (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="lessons">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {moduleData.lessons.map((lesson, index) => (
                      <Draggable key={lesson.id} draggableId={lesson.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="flex justify-between items-center bg-gray-100 p-3 rounded"
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-medium">{index + 1}.</span>
                              <div>
                                <h4 className="font-medium">{lesson.title}</h4>
                                <p className="text-sm text-gray-600">{lesson.duration}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setActiveLessonIndex(index);
                                  setIsLessonFormOpen(true);
                                }}
                                className="text-blue-600 hover:underline"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteLesson(index)}
                                className="text-red-600 hover:underline"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <p className="text-gray-500">No lessons added yet</p>
          )}
        </div>

        {/* Quiz Section */}
        <div className="border border-gray-200 rounded p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Quiz</h3>
            {moduleData.quiz ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-700">{moduleData.quiz.questions.length} questions</span>
                <button
                  type="button"
                  onClick={() => setIsQuizFormOpen(true)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => setModuleData(prev => ({ ...prev, quiz: null }))}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsQuizFormOpen(true)}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                + Add Quiz
              </button>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            {module ? 'Update Module' : 'Create Module'}
          </button>
        </div>
      </form>

      {/* Nested Forms */}
      {isLessonFormOpen && (
        <LessonForm
          lesson={
            activeLessonIndex !== null
              ? moduleData.lessons[activeLessonIndex]
              : null
          }
          onClose={() => {
            setIsLessonFormOpen(false);
            setActiveLessonIndex(null);
          }}
          onSubmit={(lessonData) => {
            if (activeLessonIndex !== null) {
              handleEditLesson(activeLessonIndex, lessonData);
            } else {
              handleAddLesson(lessonData);
            }
          }}
        />
      )}

      {isQuizFormOpen && (
        <QuizForm
          quiz={moduleData.quiz}
          onClose={() => setIsQuizFormOpen(false)}
          onSubmit={handleQuizSubmit}
        />
      )}
    </div>
  );
};

export default ModuleForm;
