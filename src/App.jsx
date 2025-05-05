//app.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Courses from './pages/courses';
import CourseDetail from './pages/coursesdetails';
import Navbar from './components/Navbar';
import CourseLearning from './pages/Learncourse';
function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/course/:id/learn" element={<CourseLearning />} />
      </Routes>
    </Router>
  );
}

export default App;
