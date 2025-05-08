import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const StatsSection = ({ stats }) => {
  const chartData = [
    { name: 'Jan', students: 20 },
    { name: 'Feb', students: 35 },
    { name: 'Mar', students: 28 },
    { name: 'Apr', students: 42 },
    { name: 'May', students: 31 },
    { name: 'Jun', students: 50 }
  ];

  const popularCourses = [
    { name: 'Web Development', students: 120 },
    { name: 'Data Science', students: 85 },
    { name: 'Mobile App Dev', students: 65 },
    { name: 'UI/UX Design', students: 45 }
  ];

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-indigo-100 p-4 rounded-md text-center">
          <h3 className="text-lg font-medium text-gray-700">Total Students</h3>
          <p className="text-2xl font-bold text-indigo-700">{stats.totalStudents || 0}</p>
        </div>

        <div className="bg-green-100 p-4 rounded-md text-center">
          <h3 className="text-lg font-medium text-gray-700">Active Students</h3>
          <p className="text-2xl font-bold text-green-700">{stats.activeStudents || 0}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded-md text-center">
          <h3 className="text-lg font-medium text-gray-700">Courses Published</h3>
          <p className="text-2xl font-bold text-yellow-700">{stats.enrolledCourses?.length || 0}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Student Enrollment Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="students" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Most Popular Courses</h3>
          <ul className="space-y-3">
            {popularCourses.map((course, index) => (
              <li
                key={index}
                className="flex justify-between items-center px-3 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-100"
              >
                <span className="font-medium text-gray-800">{course.name}</span>
                <span className="text-sm text-gray-600">{course.students} students</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
