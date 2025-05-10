import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import DashboardStats from "./DashboardStats";
import CourseCard from "./CourseCard";
import ProfileForm from "./ProfileForm";
import AddCourseModal from "./AddCourseModal";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [courses, setCourses] = useState({
    draft: [],
    ongoing: [],
    published: [],
  });
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    category: "",
    thumbnail: null,
    thumbnailPreview: "",
    modules: [],
  });
  const [currentModule, setCurrentModule] = useState({
    title: "",
    description: "",
    lessons: [],
    quiz: null,
  });
  const [currentLesson, setCurrentLesson] = useState({
    title: "",
    video: "",
    resource: "",
    duration: "",
    summary: "",
  });
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  });
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    enrolledStudents: [],
    activeStudents: 0,
  });
  const [teacherProfile, setTeacherProfile] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@university.edu",
    department: "Computer Science",
    bio: "Full Stack Developer with 10+ years of experience in web technologies",
    signature: null,
    signaturePreview: "",
  });

  useEffect(() => {
    const sampleCourses = {
      draft: [
        {
          id: "course1",
          title: "Advanced React Patterns",
          description: "Learn advanced React patterns and best practices",
          thumbnail: "",
          modules: [],
        },
      ],
      ongoing: [
        {
          id: "course2",
          title: "Node.js Microservices",
          description: "Building scalable microservices with Node.js",
          thumbnail: "",
          modules: [],
          studentsEnrolled: 15,
          startDate: "2023-05-15",
          endDate: "2023-08-15",
        },
      ],
      published: [
        {
          id: "course3",
          title: "Full Stack Development Bootcamp",
          description: "Complete guide to becoming a full stack developer",
          thumbnail: "",
          modules: [
            {
              id: "module1",
              title: "Introduction to Full Stack Development",
              description:
                "Learn the fundamentals of full stack development and web architecture",
              lessons: [
                {
                  id: "lesson1",
                  title: "What is Full Stack Development?",
                  video: "https://www.youtube.com/embed/Zftx68K-1D4",
                  resource: "/resources/fullstack_intro.pdf",
                  duration: "8:32",
                  summary:
                    "Development of both the front-end and back-end components of a web application.",
                },
              ],
            },
          ],
          studentsEnrolled: 42,
          publishedDate: "2023-01-10",
          rating: 4.7,
        },
      ],
    };

    const sampleStats = {
      totalCourses: 3,
      totalStudents: 57,
      enrolledStudents: [
        {
          id: "s1",
          name: "John Doe",
          courses: ["Full Stack Development Bootcamp"],
        },
        {
          id: "s2",
          name: "Jane Smith",
          courses: ["Full Stack Development Bootcamp", "Node.js Microservices"],
        },
      ],
      activeStudents: 38,
    };

    setCourses(sampleCourses);
    setStats(sampleStats);
  }, []);

  const handleAddCourse = () => setShowAddCourseModal(true);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setNewCourse({
          ...newCourse,
          thumbnail: file,
          thumbnailPreview: reader.result,
        });
      reader.readAsDataURL(file);
    }
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setTeacherProfile({
          ...teacherProfile,
          signature: file,
          signaturePreview: reader.result,
        });
      reader.readAsDataURL(file);
    }
  };

  const addModule = () => {
    if (currentModule.title.trim() === "") return;
    setNewCourse({
      ...newCourse,
      modules: [...newCourse.modules, currentModule],
    });
    setCurrentModule({ title: "", description: "", lessons: [], quiz: null });
  };

  const addLesson = () => {
    if (currentLesson.title.trim() === "") return;
    setCurrentModule({
      ...currentModule,
      lessons: [...currentModule.lessons, currentLesson],
    });
    setCurrentLesson({
      title: "",
      video: "",
      resource: "",
      duration: "",
      summary: "",
    });
  };

  const addQuizQuestion = () => {
    if (currentQuizQuestion.question.trim() === "") return;
    const quiz = currentModule.quiz || {
      title: `${currentModule.title} Quiz`,
      questions: [],
    };
    setCurrentModule({
      ...currentModule,
      quiz: { ...quiz, questions: [...quiz.questions, currentQuizQuestion] },
    });
    setCurrentQuizQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    });
  };

  const submitCourse = () => {
    if (newCourse.title.trim() === "" || newCourse.modules.length === 0) return;
    const newCourseObj = {
      id: `course${
        courses.draft.length +
        courses.ongoing.length +
        courses.published.length +
        1
      }`,
      title: newCourse.title,
      description: newCourse.description,
      thumbnail: newCourse.thumbnailPreview,
      modules: newCourse.modules,
      createdAt: new Date().toISOString(),
    };
    setCourses({ ...courses, draft: [...courses.draft, newCourseObj] });
    setNewCourse({
      title: "",
      description: "",
      category: "",
      thumbnail: null,
      thumbnailPreview: "",
      modules: [],
    });
    setShowAddCourseModal(false);
  };

  const publishCourse = (courseId) => {
    const courseToPublish = courses.draft.find((c) => c.id === courseId);
    if (!courseToPublish) return;
    setCourses({
      draft: courses.draft.filter((c) => c.id !== courseId),
      ongoing: [
        ...courses.ongoing,
        { ...courseToPublish, publishedDate: new Date().toISOString() },
      ],
      published: courses.published,
    });
  };

  const moveToDraft = (courseId, from) => {
    const courseToMove = courses[from].find((c) => c.id === courseId);
    if (!courseToMove) return;
    setCourses({
      ...courses,
      [from]: courses[from].filter((c) => c.id !== courseId),
      draft: [...courses.draft, { ...courseToMove }],
    });
  };

  const deleteCourse = (courseId, from) => {
    setCourses({
      ...courses,
      [from]: courses[from].filter((c) => c.id !== courseId),
    });
  };

  const updateProfile = () => alert("Profile updated successfully!");

  return (
    <div className="flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen overflow-auto">
        {activeTab === "dashboard" && (
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-semibold">
                Welcome back, {teacherProfile.name}!
              </h1>
              <p className="text-gray-600">
                Here's what's happening with your courses today.
              </p>
            </div>
            <DashboardStats stats={stats} />
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Your Courses</h2>
                <button
                  onClick={handleAddCourse}
                  className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
                >
                  Add Course
                </button>
              </div>
              {["draft", "ongoing", "published"].map((status) => (
                <div key={status} className="mb-6">
                  <h3 className="text-lg font-medium capitalize">
                    {status} Courses
                  </h3>
                  {courses[status].length === 0 ? (
                    <p className="text-gray-500">No {status} courses.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {courses[status].map((course) => (
                        <CourseCard
                          key={course.id}
                          course={course}
                          category={status}
                          onPublish={publishCourse}
                          onMoveToDraft={moveToDraft}
                          onDelete={(id) => deleteCourse(id, status)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "draft" && (
          <div>
            <h1 className="text-2xl font-semibold mb-4">Draft Courses</h1>
            {courses.draft.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">
                  You don't have any draft courses yet.
                </p>
                <button
                  onClick={handleAddCourse}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
                >
                  Create New Course
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.draft.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    category="draft"
                    onPublish={publishCourse}
                    onMoveToDraft={moveToDraft}
                    onDelete={() => deleteCourse(course.id, "draft")}
                  />
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === "profile" && (
          <ProfileForm
            teacherProfile={teacherProfile}
            setTeacherProfile={setTeacherProfile}
            handleSignatureUpload={handleSignatureUpload}
            updateProfile={updateProfile}
          />
        )}
      </div>
      {showAddCourseModal && (
        <AddCourseModal
          newCourse={newCourse}
          setNewCourse={setNewCourse}
          currentModule={currentModule}
          setCurrentModule={setCurrentModule}
          currentLesson={currentLesson}
          setCurrentLesson={setCurrentLesson}
          currentQuizQuestion={currentQuizQuestion}
          setCurrentQuizQuestion={setCurrentQuizQuestion}
          handleFileUpload={handleFileUpload}
          addModule={addModule}
          addLesson={addLesson}
          addQuizQuestion={addQuizQuestion}
          submitCourse={submitCourse}
          setShowAddCourseModal={setShowAddCourseModal}
        />
      )}
    </div>
  );
};

export default TeacherDashboard;
