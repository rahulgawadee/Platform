import React from 'react';

const TeacherSidebar = ({ activeTab, setActiveTab, draftCount }) => {
  const linkClasses = (tab) =>
    `flex items-center justify-between px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-100 ${
      activeTab === tab ? 'bg-blue-200 font-semibold' : 'text-gray-700'
    }`;

  return (
    <aside className="w-64 h-screen bg-white shadow-lg flex flex-col justify-between">
      <div>
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Teacher Dashboard</h2>
        </div>

        <nav className="mt-4 px-2">
          <ul className="space-y-2">
            <li className={linkClasses('dashboard')} onClick={() => setActiveTab('dashboard')}>
              <span className="flex items-center gap-2">
                <i className="icon-dashboard"></i> Dashboard
              </span>
            </li>

            <li className={linkClasses('stats')} onClick={() => setActiveTab('stats')}>
              <span className="flex items-center gap-2">
                <i className="icon-stats"></i> Statistics
              </span>
            </li>

            <li className={linkClasses('drafts')} onClick={() => setActiveTab('drafts')}>
              <div className="flex items-center justify-between w-full">
                <span className="flex items-center gap-2">
                  <i className="icon-drafts"></i> Drafts
                </span>
                {draftCount > 0 && (
                  <span className="ml-2 text-xs font-semibold bg-red-500 text-white px-2 py-0.5 rounded-full">
                    {draftCount}
                  </span>
                )}
              </div>
            </li>

            <li className={linkClasses('profile')} onClick={() => setActiveTab('profile')}>
              <span className="flex items-center gap-2">
                <i className="icon-profile"></i> Profile
              </span>
            </li>
          </ul>
        </nav>
      </div>

      <div className="px-6 py-4 border-t text-sm text-gray-500">
        <p>© 2023 LMS Platform</p>
      </div>
    </aside>
  );
};

export default TeacherSidebar;
