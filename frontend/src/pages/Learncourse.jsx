// frontend/src/CourseLearning.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logoPraktikly.png";

const CourseLearning = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State management
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [completedQuizzes, setCompletedQuizzes] = useState(new Set());
  const [activeTab, setActiveTab] = useState("lessons");
  const [notes, setNotes] = useState({});
  const [currentNote, setCurrentNote] = useState("");
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/teacher_courses/${id}`
        );
        const courseData = response.data;

        // Transform backend data to frontend structure
        const transformedModules = courseData.modules.map((module) => ({
          ...module,
          lessons: module.lessons.map((lesson) => ({
            ...lesson,
            video: lesson.video_url,
            resource: lesson.resource_url,
            id: lesson._id, // Assuming MongoDB generates _id
          })),
          quiz: module.quiz
            ? {
                ...module.quiz,
                questions: module.quiz.questions.map((question) => ({
                  ...question,
                  id: question._id,
                })),
              }
            : null,
        }));

        setCourse({
          ...courseData,
          modules: transformedModules,
        });

        if (
          transformedModules.length > 0 &&
          transformedModules[0].lessons.length > 0
        ) {
          setSelectedLesson(transformedModules[0].lessons[0]);
        }
      } catch (err) {
        setError(err.response?.data?.detail || "Error loading course");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const allLessons = course?.modules?.flatMap((mod) => mod.lessons) || [];
  const progressPercentage =
    allLessons.length > 0
      ? Math.round((completedLessons.size / allLessons.length) * 100)
      : 0;

  const generateCertificate = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");

    // Certificate generation logic
    // ... (same as previous implementation)
  };

  if (loading) return <div className="text-center py-8">Loading course...</div>;
  if (error)
    return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#0f0f0f] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="h-8" />
            </Link>
            <div className="flex-1 text-center">
              <h1 className="text-white text-sm font-semibold">
                {course.title}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-white text-sm">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700">
                  {progressPercentage}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 bg-white p-4 border-r border-gray-200">
          <button
            onClick={() => navigate("/courses")}
            className="mb-6 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
          >
            ← Back to Courses
          </button>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Course Progress</h2>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Modules List */}
          <div className="space-y-4">
            {course.modules.map((module) => (
              <div
                key={module.id}
                className="border rounded-lg overflow-hidden"
              >
                <div className="bg-gray-100 p-3">
                  <h3 className="font-semibold">{module.title}</h3>
                  <p className="text-sm text-gray-600">{module.description}</p>
                </div>
                <ul className="divide-y divide-gray-200">
                  {module.lessons.map((lesson) => (
                    <li
                      key={lesson.id}
                      className={`p-3 cursor-pointer ${
                        selectedLesson?.id === lesson.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => setSelectedLesson(lesson)}
                    >
                      <div className="flex justify-between">
                        <span>{lesson.title}</span>
                        <span className="text-gray-500">{lesson.duration}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {selectedLesson ? (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">
                {selectedLesson.title}
              </h2>
              <div className="aspect-w-16 aspect-h-9 mb-6">
                <iframe
                  src={selectedLesson.video}
                  title={selectedLesson.title}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold">Lesson Summary</h3>
                <p className="text-gray-700">{selectedLesson.summary}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Select a lesson from the sidebar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseLearning;
