import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;

    // Check if the token is in the headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 1. Get token from header (e.g., "Bearer eyJhbGci...")
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify the token using your JWT_SECRET
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Get the user from the database using the ID in the token
            // We attach this user to the request object (req.user)
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
            }

            // 4. Move on to the next function (e.g., the controller)
            next();
        } catch (error) {
            res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};

// Middleware to check if the user is an educator
export const isEducator = (req, res, next) => {
    if (req.user && req.user.role === 'educator') {
        next();
    } else {
        res.status(403).json({ success: false, message: 'Not authorized as an educator' });
    }
};