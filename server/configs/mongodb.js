import mongoose from "mongoose";

// connect to the MongoDB database

const connectDB = async ()=>{
    mongoose.connection.on('connected', ()=> console.log(
        'database connected'))
        await mongoose.connect(`${process.env.MONGO_URI}/edemy`)
}

export default connectDB;