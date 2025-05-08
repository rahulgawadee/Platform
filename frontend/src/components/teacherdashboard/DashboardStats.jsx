import React from 'react';

const DashboardStats = ({ stats }) => {
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl shadow p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-700">Total Courses</h3>
        <p className="text-2xl font-bold text-blue-600 mt-2">{stats.totalCourses}</p>
      </div>
      <div className="bg-white rounded-2xl shadow p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-700">Total Students</h3>
        <p className="text-2xl font-bold text-green-600 mt-2">{stats.totalStudents}</p>
      </div>
      <div className="bg-white rounded-2xl shadow p-4 text-center">
        <h3 className="text-lg font-semibold text-gray-700">Active Students</h3>
        <p className="text-2xl font-bold text-purple-600 mt-2">{stats.activeStudents}</p>
      </div>
      <div className="bg-white rounded-2xl shadow p-4 text-center col-span-1 lg:col-span-3">
        <h3 className="text-lg font-semibold text-gray-700">Avg. Rating</h3>
        <p className="text-2xl font-bold text-yellow-500 mt-2">4.5/5</p>
      </div>

      <div className="bg-white rounded-2xl shadow p-4 col-span-1 lg:col-span-3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Recent Enrollments</h2>
          <button className="text-blue-600 hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2 border-b">Student</th>
                <th className="px-4 py-2 border-b">Course</th>
                <th className="px-4 py-2 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.enrolledStudents.map((student, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{student.name}</td>
                  <td className="px-4 py-2 border-b">{student.courses.join(', ')}</td>
                  <td className="px-4 py-2 border-b">2023-06-{10 + index}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
