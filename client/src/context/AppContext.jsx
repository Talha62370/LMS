import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets"; 
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import axios from 'axios'; 

export const AppContext = createContext();

// Get the API URL from the .env file
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AppContextprovider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();

    // --- NEW AUTH STATE ---
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    
    // --- DERIVED STATE ---
    const isEducator = user?.role === 'educator';

    // --- AXIOS INSTANCE WITH TOKEN ---
    const api = axios.create({
        baseURL: API_BASE_URL
    });

    api.interceptors.request.use((config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    // --- NEW AUTH FUNCTIONS ---
    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
            
            if (res.data.success) {
                const { token, ...userData } = res.data;
                
                setToken(token);
                setUser(userData);
                
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));
                
                navigate('/'); 
            }
            return res.data; 
        } catch (error) {
            console.error("Login failed:", error);
            return error.response.data; 
        }
    };

    // --- UPDATED register FUNCTION ---
    const register = async (name, email, password, role) => {
        try {
            // --- PASS THE 'role' IN THE AXIOS REQUEST ---
            const res = await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password, role });
             
            if (res.data.success) {
                const { token, ...userData } = res.data;

                setToken(token);
                setUser(userData);

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));
                
                navigate('/'); 
            }
            return res.data; 
        } catch (error) {
            console.error("Registration failed:", error);
            return error.response.data; 
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login'); 
    };
    
    const updateUserInContext = (updatedUserData) => {
        const newUser = { ...user, ...updatedUserData };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const becomeEducator = async () => {
        try {
            const res = await api.get('/educator/update-role');

            if (res.data.success) {
                updateUserInContext({ role: res.data.role });
                navigate('/educator');
            } else {
                console.error("Failed to become educator:", res.data.message);
            }
        } catch (error) {
            console.error("Error updating role:", error);
        }
    };

    // --- EXISTING STATE & FUNCTIONS ---
    const [allCourses, setAllCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    
    const fetchAllCourses = async ()=>{
        setAllCourses(dummyCourses);
    }

    const calculateRating = (course) => {
        if (course.courseRatings.length === 0) return 0;
        let totalRating = 0;
        course.courseRatings.forEach(rating => {
            totalRating += rating.rating;
        });
        return totalRating / course.courseRatings.length;
    };

    const calculateChapterTime = (chapter) => {
        let time = 0;
        chapter.chapterContent.map((lecture) => time += lecture.lectureDuration);
        return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]});
    };

    const calculateCourseDuration = (course) => {
        let time = 0;
        course.courseContent.map((chapter) => chapter.chapterContent.map(
            (lecture) => time += lecture.lectureDuration
        ));
        return humanizeDuration(time * 60 * 1000, {units: ["h", "m"]});
    };

    const calculateNoOfLecture = (course) => {
        let totalLecture = 0;
        course.courseContent.forEach(chapter => {
            if(Array.isArray(chapter.chapterContent)){
            totalLecture += chapter.chapterContent.length;
            }
        });
        return totalLecture;
    };

    const fetchUserEnrolledCourses = async () => {
        setEnrolledCourses(dummyCourses);
    };

    useEffect(() => {
        fetchAllCourses();
        if (token) {
            fetchUserEnrolledCourses();
        }
    }, [token]); 

    // --- NEW VALUE OBJECT ---
    const value = {
        currency, allCourses, navigate, calculateRating, isEducator,
        calculateChapterTime, calculateCourseDuration, calculateNoOfLecture,
        enrolledCourses, fetchUserEnrolledCourses,
        
        login,
        logout,
        register,
        user,       
        token,      
        api,        
        updateUserInContext,
        becomeEducator 
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}