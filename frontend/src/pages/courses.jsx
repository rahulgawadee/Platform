import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import praktiklyLogo from "../assets/logoPraktikly.png";
import axios from "axios";

const assignmentsData = [
  {
    id: 1,
    title: "Assignment 1",
    dueDate: "2023-08-15",
    completed: false,
  },
  {
    id: 2,
    title: "Assignment 2",
    dueDate: "2023-08-20",
    completed: true,
  },
];

const announcementsData = [
  {
    id: 1,
    title: "Announcement 1",
    date: "2023-08-15",
  },
  {
    id: 2,
    title: "Announcement 2",
    date: "2023-08-20",
  },
];
const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [visibleCourses, setVisibleCourses] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseTypeFilter, setCourseTypeFilter] = useState("all");
  const [goodToKnowFilter, setGoodToKnowFilter] = useState("all");
  const [completedCourses, setCompletedCourses] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/teacher_courses/"
        );
        console.log("API Response:", response.data);

        // Handle different response structures
        const rawData = response.data;
        const coursesArray = Array.isArray(rawData)
          ? rawData
          : rawData.results || rawData.courses || [];

        if (coursesArray.length > 0) {
          setCourses(
            coursesArray.map((course) => ({
              id: course.id || course._id,
              title: course.title || course.name || "Untitled Course",
              instructor:
                course.instructor || course.teacher || "Unknown Instructor",
              duration: course.duration || "Not specified",
              level: course.level || "Beginner",
              type: course.type ? course.type.toLowerCase() : "free",
              thumbnail: course.thumbnail || "",
              status: course.status || "remaining",
            }))
          );
        } else {
          setError("No courses found in the response");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(`Error loading courses: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleViewMore = () => {
    setVisibleCourses((prev) => prev + 4);
  };

  const filteredCourses = courses
    .filter((course) =>
      (course.title || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((course) =>
      courseTypeFilter === "all" ? true : course.type === courseTypeFilter
    );

  const goodToKnowCourses = courses.filter((course) =>
    goodToKnowFilter === "all" ? true : course.type === goodToKnowFilter
  );

  if (loading) {
    return <div className="text-center py-8">Loading courses...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
        <p className="mt-4">Using sample data for demonstration</p>
        {/* You could load sample data here if needed */}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4 sm:px-6 lg:px-20">
      {/* Header Section */}
      <div className="mb-10 flex items-center bg-blue-500 p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="mr-4">
          <img src={praktiklyLogo} alt="Praktikly" className="h-12" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-1">
            Welcome back, User!
          </h1>
          <p className="text-lg text-white">Government University of Sweden</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 max-w-xl">
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="flex gap-2">
          <select
            value={courseTypeFilter}
            onChange={(e) => setCourseTypeFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white"
          >
            <option value="all">All Courses</option>
            <option value="free">Free Courses</option>
            <option value="paid">Paid Courses</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Explore Courses</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-10">
        {filteredCourses.slice(0, visibleCourses).map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
          >
            {/* Status Badge */}
            {course.status && (
              <span
                className={`absolute top-2 right-2 text-white text-xs font-semibold px-2 py-1 rounded-full ${
                  course.status === "completed"
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
              >
                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
              </span>
            )}

            {/* Course Thumbnail */}
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-48 object-cover bg-gray-100"
              onError={(e) => {
                e.target.src = "";
              }}
            />

            {/* Course Details */}
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <div className="text-sm text-gray-600 space-y-1">
                <p>By {course.instructor}</p>
                <p>Duration: {course.duration}</p>
                <p>Level: {course.level}</p>
              </div>

              <Link
                to={`/courses/${course.id}`}
                className="block mt-4"
                aria-label={`View ${course.title} course`}
              >
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors">
                  {course.status === "completed"
                    ? "Review Course"
                    : "Start Learning"}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      {visibleCourses < filteredCourses.length && (
        <div className="text-center mb-12">
          <button
            onClick={handleViewMore}
            className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            View More Courses
          </button>
        </div>
      )}

      {/* Upcoming Assignments/Quizzes and Announcements Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Upcoming Assignments/Quizzes */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Upcoming Assignments/Quizzes
          </h2>
          <div className="space-y-4">
            {assignmentsData.map((item) => (
              <div
                key={item.id}
                className="border-l-4 border-blue-500 pl-4 py-2"
              >
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.course}</p>
                <p className="text-sm text-gray-500">
                  Due: {new Date(item.dueDate).toLocaleDateString()} |
                  <span
                    className={`ml-2 ${
                      item.type === "quiz"
                        ? "text-purple-600"
                        : "text-green-600"
                    }`}
                  >
                    {item.type === "quiz" ? "Quiz" : "Assignment"}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Announcements
          </h2>
          <div className="space-y-4">
            {announcementsData.map((announcement) => (
              <div
                key={announcement.id}
                className="pb-4 border-b border-gray-200 last:border-0 last:pb-0"
              >
                <h3 className="font-semibold text-gray-800">
                  {announcement.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {announcement.content}
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Posted: {new Date(announcement.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Course Progress */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Course Progress
          </h2>
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                Overall Progress
              </span>
              <span className="text-sm font-medium text-gray-700">
                {completedCourses} of {courses.length} courses
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{
                  width: `${(completedCourses / courses.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Your Courses:</h3>
            <ul className="space-y-2">
              {courses.slice(0, 5).map((course) => (
                <li key={course.id} className="flex items-center">
                  <span
                    className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      course.status === "completed"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  ></span>
                  <span className="text-sm text-gray-700">{course.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Good to Know Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Good to Know</h2>
          <div className="flex space-x-4">
            <button
              className={`px-4 py-1 rounded-lg font-medium ${
                goodToKnowFilter === "paid"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setGoodToKnowFilter("paid")}
            >
              Paid
            </button>
            <button
              className={`px-4 py-1 rounded-lg font-medium ${
                goodToKnowFilter === "free"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setGoodToKnowFilter("free")}
            >
              Free
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="overflow-x-auto pb-4">
            <div
              className="flex space-x-6"
              style={{ minWidth: `${goodToKnowCourses.length * 320}px` }}
            >
              {goodToKnowCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex-shrink-0 w-80 relative"
                >
                  <div className="absolute top-2 right-2 flex space-x-2">
                    {course.type === "paid" && (
                      <span className="bg-purple-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        Paid
                      </span>
                    )}
                    {course.type === "free" && (
                      <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        Free
                      </span>
                    )}
                  </div>
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-40 object-cover bg-gray-100"
                    onError={(e) => {
                      e.target.src = "";
                    }}
                  />
                  <div className="p-5">
                    <h2 className="text-lg font-semibold mb-2">
                      {course.title}
                    </h2>
                    <p className="text-sm text-gray-600 mb-1">
                      By {course.instructor}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      Duration: {course.duration}
                    </p>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors">
                      {course.type === "paid" ? "Enroll Now" : "Start Learning"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
