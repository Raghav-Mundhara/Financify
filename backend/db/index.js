import mongoose from "mongoose";

export default async function connectDB() {
    try {
        await mongoose.connect("mongodb+srv://mundhararaghav16:o1kPLQI7sFeIvYcH@cluster0.l7nepr7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to MongoDB");

    } catch (error) {
        console.log(error);
    }
}

