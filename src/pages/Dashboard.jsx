import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { 
  Home, BookOpen, Calendar, ClipboardList, GraduationCap, Briefcase, Settings,
  Bell, Search, User, ChevronRight, Clock, AlertCircle, TrendingUp, 
  FileText, CheckCircle, Plus, Filter, Download, Users, File
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userRole, setUserRole] = useState('student'); // 'student', 'teacher', 'admin', 'employer'

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4 flex items-center justify-center border-b border-gray-200">
          <h1 className="text-xl font-bold text-indigo-600">Pratikly</h1>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/" 
                className={`flex items-center p-3 rounded-lg ${activeTab === 'home' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('home')}
              >
                <Home className="w-5 h-5 mr-3" />
                <span>Home</span>
              </Link>
            </li>
            
            <li>
              <Link 
                to="/courses" 
                className={`flex items-center p-3 rounded-lg ${activeTab === 'courses' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('courses')}
              >
                <BookOpen className="w-5 h-5 mr-3" />
                <span>My Courses</span>
              </Link>
            </li>
            
            <li>
              <Link 
                to="/calendar" 
                className={`flex items-center p-3 rounded-lg ${activeTab === 'calendar' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('calendar')}
              >
                <Calendar className="w-5 h-5 mr-3" />
                <span>Calendar</span>
              </Link>
            </li>
            
            <li>
              <Link 
                to="/assignments" 
                className={`flex items-center p-3 rounded-lg ${activeTab === 'assignments' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('assignments')}
              >
                <ClipboardList className="w-5 h-5 mr-3" />
                <span>Assignments</span>
              </Link>
            </li>
            
            {(userRole === 'teacher' || userRole === 'admin') && (
              <li>
                <Link 
                  to="/grades" 
                  className={`flex items-center p-3 rounded-lg ${activeTab === 'grades' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('grades')}
                >
                  <FileText className="w-5 h-5 mr-3" />
                  <span>Grade Center</span>
                </Link>
              </li>
            )}
            
            <li>
              <Link 
                to="/internships" 
                className={`flex items-center p-3 rounded-lg ${activeTab === 'internships' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('internships')}
              >
                <GraduationCap className="w-5 h-5 mr-3" />
                <span>Internships</span>
              </Link>
            </li>
            
            <li>
              <Link 
                to="/jobs" 
                className={`flex items-center p-3 rounded-lg ${activeTab === 'jobs' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab('jobs')}
              >
                <Briefcase className="w-5 h-5 mr-3" />
                <span>Job Board</span>
              </Link>
            </li>
            
            {userRole === 'admin' && (
              <li>
                <Link 
                  to="/admin" 
                  className={`flex items-center p-3 rounded-lg ${activeTab === 'admin' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-100'}`}
                  onClick={() => setActiveTab('admin')}
                >
                  <Settings className="w-5 h-5 mr-3" />
                  <span>Admin Panel</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
       
        {/* Dynamic Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<HomeTab userRole={userRole} />} />
            <Route path="/courses" element={<CoursesTab />} />
            <Route path="/calendar" element={<CalendarTab />} />
            <Route path="/assignments" element={<AssignmentsTab />} />
            <Route path="/grades" element={<GradesTab />} />
            <Route path="/internships" element={<InternshipsTab />} />
            <Route path="/jobs" element={<JobsTab />} />
            <Route path="/admin" element={<AdminTab />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// Tab Components
const HomeTab = ({ userRole }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome Back!</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upcoming Deadlines */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg flex items-center">
              <Clock className="w-5 h-5 mr-2 text-indigo-600" />
              Upcoming Deadlines
            </h3>
            <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="bg-indigo-100 p-1 rounded-full mr-3 mt-1">
                <ClipboardList className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium">Assignment 1</p>
                <p className="text-sm text-gray-500">Due tomorrow</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-indigo-100 p-1 rounded-full mr-3 mt-1">
                <FileText className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium">Quiz 2</p>
                <p className="text-sm text-gray-500">Due in 3 days</p>
              </div>
            </li>
          </ul>
        </div>
        
        {/* Recent Announcements */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-indigo-600" />
              Announcements
            </h3>
            <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="bg-indigo-100 p-1 rounded-full mr-3 mt-1">
                <BookOpen className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium">New course added: Advanced React</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-indigo-100 p-1 rounded-full mr-3 mt-1">
                <Briefcase className="w-4 h-4 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium">Career fair next week</p>
                <p className="text-sm text-gray-500">Yesterday</p>
              </div>
            </li>
          </ul>
        </div>
        
        {/* Course Progress */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-indigo-600" />
              Course Progress
            </h3>
            <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Web Development</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Data Science</span>
                <span>30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Internship Opportunities */}
        {userRole === 'student' && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-indigo-600" />
                Recommended Internships
              </h3>
              <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-indigo-100 p-1 rounded-full mr-3 mt-1">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium">Frontend Developer at TechCorp</p>
                  <p className="text-sm text-gray-500">Apply by May 15</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-indigo-100 p-1 rounded-full mr-3 mt-1">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="font-medium">Data Analyst at DataWorld</p>
                  <p className="text-sm text-gray-500">Apply by May 30</p>
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const CoursesTab = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Plus className="w-5 h-5 mr-2" />
          Add Course
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Course Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-32 bg-indigo-100 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-indigo-600" />
          </div>
          <div className="p-6">
            <h3 className="font-bold text-lg mb-1">Web Development Bootcamp</h3>
            <p className="text-gray-500 mb-3">Instructor: John Doe</p>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center">
              Continue Learning <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-32 bg-indigo-100 flex items-center justify-center">
            <BookOpen className="w-12 h-12 text-indigo-600" />
          </div>
          <div className="p-6">
            <h3 className="font-bold text-lg mb-1">Data Science Fundamentals</h3>
            <p className="text-gray-500 mb-3">Instructor: Jane Smith</p>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center">
              Continue Learning <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CalendarTab = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Calendar</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        {/* Calendar component would go here */}
        <div className="h-96 flex items-center justify-center bg-gray-50 rounded-lg">
          <p className="text-gray-500">[Calendar View with assignments, classes, and events]</p>
        </div>
      </div>
    </div>
  );
};

const AssignmentsTab = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Assignments</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">All</button>
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Pending</button>
            <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">Submitted</button>
          </div>
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-5 h-5 mr-2" />
            Export
          </button>
        </div>
        
        <div className="divide-y divide-gray-200">
          <div className="p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Assignment 1</h3>
                <p className="text-sm text-gray-500">Web Development</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Due: Tomorrow</p>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Submitted
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Quiz 2</h3>
                <p className="text-sm text-gray-500">Data Science</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">Due: In 3 days</p>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                  Pending
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GradesTab = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Grade Center</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Web Development</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Assignment 1</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">85%</td>
                <td className="px-6 py-4 text-sm text-gray-500">Good work, but needs more comments in code.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const InternshipsTab = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Internship Opportunities</h2>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Plus className="w-5 h-5 mr-2" />
          New Internship
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg mb-1">Frontend Developer Intern</h3>
                <p className="text-gray-500">Company: TechCorp</p>
              </div>
              <div className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                New
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span>Duration: 3 months</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <AlertCircle className="w-4 h-4 mr-2" />
                <span>Application Deadline: 15 days</span>
              </div>
            </div>
            <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Apply Now
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-lg mb-1">Data Analyst Intern</h3>
                <p className="text-gray-500">Company: DataWorld</p>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span>Duration: 6 months</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <AlertCircle className="w-4 h-4 mr-2" />
                <span>Application Deadline: 30 days</span>
              </div>
            </div>
            <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobsTab = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Job Board</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search jobs..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex space-x-2">
            <div className="relative">
              <select className="appearance-none block pl-3 pr-8 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                <option>All Categories</option>
                <option>Technology</option>
                <option>Business</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronRight className="w-4 h-4 transform rotate-90" />
              </div>
            </div>
            <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">Junior Web Developer</h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                New
              </span>
            </div>
            <p className="text-gray-600 mb-4">Company: WebSolutions Inc.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Remote
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Full-time
              </span>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Posted: 2 days ago</p>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminTab = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-300 hover:shadow-md transition-all">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-indigo-100 mr-4">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="font-medium">Manage Users</span>
          </div>
        </button>
        
        <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-300 hover:shadow-md transition-all">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-indigo-100 mr-4">
              <BookOpen className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="font-medium">Manage Courses</span>
          </div>
        </button>
        
        <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-300 hover:shadow-md transition-all">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-indigo-100 mr-4">
              <Settings className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="font-medium">System Settings</span>
          </div>
        </button>
        
        <button className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-300 hover:shadow-md transition-all">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-indigo-100 mr-4">
              <File className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="font-medium">Reports</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;