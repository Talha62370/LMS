import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import connectCloudinary from './configs/cloudnary.js';
import educatorRouter from './routes/educatorRoutes.js';
import authRouter from './routes/authRoutes.js'; // Import our new auth routes

const app = express();

// Connect to database
await connectDB();
// Connect to Cloudinary
connectCloudinary();

// Middleware
app.use(cors());
app.use(express.json()); // This replaces clerkMiddleware()

// Routes
app.get('/', (req, res) => res.send("API working"));
app.use('/api/auth', authRouter); // Add our new auth routes
app.use('/api/educator', educatorRouter); // Keep your educator routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});