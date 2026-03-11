import Course from '../models/Course.js';
import User from '../models/User.js'; 
import {v2 as cloudinary} from 'cloudinary'

export const updateRoleToEducator = async (req, res) => {
    try {
        const userId = req.user._id; 

        // Find the user by their ID and update their role
        const user = await User.findByIdAndUpdate(userId, 
            { role: 'educator' },
            { new: true } // This option returns the updated user document
        );

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'Role updated to educator', role: user.role });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// Add New Course
export const addCourse = async (req, res) => {
    try {
        const {courseData} = req.body
        const imageFile =  req.imageFile
        const educatorId = req.auth.userId

        if (!imageFile) {
            return res.status(404).json({ success: false, message: 'Thumbnail Not Attached' });
        }

        const parsedCourseData = await json.parse(courseData)
        parsedCourseData.educator = educatorId
        const newCourse = await Course.create(parsedCourseData)
        const imageUpload =  await cloudinary.uploader.upload(imageFile.path)
        newCourse.courseThumbnail = imageUpload.secure_url

        res.json({ success: true, message: 'Course Added'})


    } catch (error) {
        res.json({ success: false, message: error.message})
    }
}