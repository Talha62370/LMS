import React, { useContext } from 'react'; // Import useContext
import { AppContext } from '../../context/AppContext'; // Import our context
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Get the 'user' and 'logout' function from our new context
  const { user, logout } = useContext(AppContext);

  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="w-28 lg:w-32"/>
      </Link>
      <div className="flex items-center gap-5 text-gray-500 relative">
        {/* Use user.name from our user object */}
        <p>Hi! {user ? user.name : "Developer"}</p>

        {user ? (
          // This replaces the <UserButton />
          <div className="flex items-center gap-3">
            <img 
              src={user.imageUrl || assets.profile_img} // Use user's image or default
              alt="profile" 
              className="w-8 h-8 rounded-full object-cover"
            />
            <button
              onClick={logout} // Call the logout function from our context
              className="bg-blue-500 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-blue-600"
            >
              Logout
            </button>
          </div>
        ) : (
          // If no user, link to the login page
          <Link to="/login">
            <img className="max-w-8" src={assets.profile_img} alt="profile icon" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;