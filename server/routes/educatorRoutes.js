import express from 'express';
import { updateRoleToEducator } from '../controller/educatorController.js';
import { requireAuth } from '@clerk/express';

const educatorRouter = express.Router();

educatorRouter.get('/update-role', requireAuth(), (req, res) => {
    console.log("✅ /update-role route hit");
    res.json({ test: true });
});


export default educatorRouter;
