//app.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Courses from './pages/courses';
import CourseDetail from './pages/coursesdetails';
import CourseLearning from './pages/Learncourse';
import TeacherDashboard from './components/teacherdashboard/TeacherDashboard';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
   
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/course/:id/learn" element={<CourseLearning />} />
        
        {/* Teacher Routes */}
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
           
          
        
    
      </Routes>
    </Router>
  );
}

export default App;