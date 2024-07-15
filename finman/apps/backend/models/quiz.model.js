import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    },
    point: {
        type: Number,
        required: true
    }
});

const quizModel=mongoose.model('Quiz',QuizSchema);

export default quizModel;