import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import Home from "./pages/student/Home";
import CoursesList from "./pages/student/CoursesList";
import CourseDetails from "./pages/student/CourseDetails";
import MyEnrollments from "./pages/student/MyEnrollments";
import Player from "./pages/student/Player";
import Educator from "./pages/educator/Educator";
import Dashboard from "./pages/educator/Dashboard";
import AddCourse from "./pages/educator/AddCourse";
import MyCourses from "./pages/educator/MyCourses";
import StudentsEnrolled from "./pages/educator/StudentsEnrolled";
import Navbar from "./components/students/Navbar";
import "quill/dist/quill.snow.css";

// --- OUR NEW IMPORTS ---
import LoginRegister from "./pages/LoginRegister";
import ProtectedRoute from "./components/ProtectedRoute";
import Loading from "./components/students/Loading"; // Updated path (from /components/students/Loading)

const App = () => {

  const isEducatorRoute = useMatch('/educator/*');

  return (
    <div className="text-default min-h-screen bg-white">
      {/* This logic is still perfect! */}
      {!isEducatorRoute && <Navbar />}
      
      <Routes>
        {/* === PUBLIC ROUTES === */}
        <Route path="/" element={<Home />} />
        <Route path="course-list" element={<CoursesList />} />
        <Route path="course-list/:input" element={<CoursesList />} />
        <Route path="course/:id" element={<CourseDetails />} />
        <Route path="/loading/:path" element={<Loading />} />

        {/* === AUTH ROUTES === */}
        <Route path="/login" element={<LoginRegister />} />
        <Route path="/register" element={<LoginRegister />} />

        {/* === STUDENT PROTECTED ROUTES === */}
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        
        <Route 
          path="/player/:courseId" 
          element={
            <ProtectedRoute role="student">
              <Player />
            </ProtectedRoute>
          } 
        />

        {/* === EDUCATOR PROTECTED ROUTES === */}
        {/* We wrap the main Educator layout. This protects all nested routes. */}
        <Route 
          path="/educator" 
          element={
            <ProtectedRoute role="educator">
              <Educator />
            </ProtectedRoute>
          }
        >
            <Route index element={<Dashboard/>}/> {/* Use 'index' for the base /educator route */}
            <Route path='add-course' element={<AddCourse/>}/>
            <Route path='my-courses' element={<MyCourses/>}/>
            <Route path='student-enrolled' element={<StudentsEnrolled/>}/>
        </Route>
        
      </Routes>
    </div>
  );
};

export default App;