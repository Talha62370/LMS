import React, { useContext } from "react"; 
import { assets } from "../../assets/assets";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext"; 

const Navbar = () => {
  const { navigate, isEducator, user, logout, becomeEducator } = useContext(AppContext);

  const location = useLocation();
  const isCourseListpage = location.pathname.includes("/course-list");

  return (
    <div
      className={`flex items-center justify-between px-4 sm:px-10
      md:px-14 lg:px-36 border-b border-gray-500 py-4 ${
        isCourseListpage ? "bg-white" : "bg-cyan-100/70"
      }`}
    >
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="w-28 lg:w-32 cursor-pointer"
      />

      {/* --- Desktop Navbar (This part was already correct) --- */}
      <div className="hidden md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {user && ( 
            <>
              <button onClick={() => { isEducator ? navigate('/educator') : becomeEducator() }}>
                {isEducator ? 'Educator Dashboard' : 'Become Educator'}
              </button>
              |{" "}
              <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <div className="flex items-center gap-3">
             <img 
              src={user.imageUrl || assets.profile_img} 
              alt="profile" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <button
              onClick={logout} 
              className="bg-red-500 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 text-white px-5 py-2 rounded-full"
          >
            Create Account / Login
          </Link>
        )}
      </div>

      {/* --- Mobile Navbar (THIS IS THE FIXED PART) --- */}
      <div className="md:hidden flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              <button onClick={() => { isEducator ? navigate('/educator') : becomeEducator() }}>
                {isEducator ? 'Educator' : 'Be Educator'}
              </button>
              |{" "}
              <Link to="/my-enrollments">Enrolled</Link>
            </>
          )}
        </div>

        {user ? (
          // --- THIS IS THE FIX ---
          // Was: <img ... onClick={logout} />
          // Now: A container with the image and a separate button
          <div className="flex items-center gap-2">
            <img 
              src={user.imageUrl || assets.profile_img} 
              alt="profile" 
              className="w-8 h-8 rounded-full object-cover"
              // onClick={logout} <-- This is removed from the image
            />
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded-md text-xs font-medium"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login">
            <img src={assets.user_icon} alt="User Icon" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;