import React from 'react';
import { FiBarChart2, FiFileText, FiUser, FiBook } from 'react-icons/fi';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', icon: <FiBarChart2 />, label: 'Dashboard' },
    { id: 'draft', icon: <FiFileText />, label: 'Draft Courses' },
    { id: 'profile', icon: <FiUser />, label: 'Update Profile' },
  ];

  return (
    <div className="w-64 h-screen bg-white shadow-lg flex flex-col p-4">
      <div className="flex items-center gap-2 mb-8 text-blue-600">
        <FiBook className="text-2xl" />
        <h1 className="text-xl font-bold">LMS Teacher</h1>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map(({ id, icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all 
              ${
                activeTab === id
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
