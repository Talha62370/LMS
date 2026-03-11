import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Loading from './students/Loading'; // You already have this component

// This component will accept a 'role' prop
// e.g., <ProtectedRoute role="educator">
const ProtectedRoute = ({ children, role }) => {
    const { user, token } = useContext(AppContext);
    const location = useLocation();

    // Check 1: Is user logged in? (We check 'token' for this)
    if (!token) {
        // Not logged in: Redirect them to the login page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check 2: We are waiting for user data to load from context
    // (This can happen on a page refresh)
    if (!user) {
        // Show a loading spinner while user data is being verified
        return <Loading />;
    }

    // Check 3: Does this route require a specific role?
    if (role && user.role !== role) {
        // Logged in, but wrong role: Redirect them to the homepage.
        // e.g., a student trying to access /educator
        return <Navigate to="/" replace />;
    }

    // If all checks pass, show the page they wanted!
    return children;
};

export default ProtectedRoute;