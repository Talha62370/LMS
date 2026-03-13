import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import connectCloudinary from './configs/cloudnary.js';
import educatorRouter from './routes/educatorRoutes.js';
import authRouter from './routes/authRoutes.js'; 

const app = express();

// Connect to database
await connectDB();

// Connect to Cloudinary
connectCloudinary();

// --- 1. UPDATED CORS MIDDLEWARE ---
// This tells your backend to accept requests from your exact live frontend URL
app.use(cors({
    origin: ["https://lms-iota-ruby.vercel.app", "http://localhost:5173"], 
    credentials: true
}));
app.use(express.json()); 

// Routes
app.get('/', (req, res) => res.send("API working on Vercel!"));
app.use('/api/auth', authRouter); 
app.use('/api/educator', educatorRouter); 

// --- 2. UPDATED LISTENER & EXPORT ---
// Vercel needs the app exported. Localhost needs the app to listen.
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// CRUCIAL FOR VERCEL: Export the app!
export default app;