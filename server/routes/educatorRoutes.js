import express from 'express';
import { addCourse, updateRoleToEducator } from '../controller/educatorController.js';
import { protect, isEducator } from '../middleware/authMiddleware.js'; 
import upload from '../configs/multer.js';

const educatorRouter = express.Router();

educatorRouter.get('/update-role', protect, updateRoleToEducator);
educatorRouter.post('/add-course', 
    protect, 
    isEducator, 
    upload.single('image'), 
    addCourse
);

export default educatorRouter;