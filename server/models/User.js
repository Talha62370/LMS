import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Make sure no two users can have the same email
    },
    password: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        default: '', // Make it optional
    },
    role: {
        type: String,
        enum: ['student', 'educator'], // Define the possible roles
        default: 'student',
    },
    enrolledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ],
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

export default User;