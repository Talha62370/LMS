import mongoose from "mongoose";

// connect to the MongoDB database

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/edemy`);
        console.log('Database connected');
    } catch (err) {
        console.error('Database connection error:', err);
        process.exit(1);
    }
}

export default connectDB;