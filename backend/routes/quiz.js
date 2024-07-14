import express from 'express';
import mongoose from 'mongoose';
import zod from 'zod';
import quizModel from '../models/quiz.model.js';
import scoreModel from '../models/score.model.js';
import { studentMiddleware } from '../middlewares/student.js';

const quizRouter = express.Router();


const answerSchema = zod.object({
    questionId: zod.string().min(1),
    selectedOption: zod.string().min(1)
});


quizRouter.get('/questions', async (req, res) => {
    try {
        const quizzes = await quizModel.find({}, { question: 1, options: 1 });
        return res.status(200).json(quizzes);
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        return res.status(400).json({ error: 'Error fetching quizzes' });
    }
});



// Function to determine literacy rate based on points
const determineLiteracyRate = (points) => {
    if (points > 8) {
        return 'high';
    } else if (points > 4 && points <= 8) {
        return 'medium';
    } else {
        return 'low';
    }
};


quizRouter.post('/answer', studentMiddleware, async (req, res) => {
    try {
        const parseResult = answerSchema.safeParse(req.body);
        if (!parseResult.success) {
            console.error("Validation error:", parseResult.error);
            return res.status(400).json({ msg: "Invalid Data", error: parseResult.error });
        }

        const { questionId, selectedOption } = parseResult.data;

        const quiz = await quizModel.findById(questionId);
        if (!quiz) {
            return res.status(404).json({ msg: "Quiz question not found" });
        }
        const isCorrect = quiz.correctAnswer === selectedOption;
        const points = isCorrect ? 2 : 0; 
        const studentId = req.userId; 
        let studentScore = await scoreModel.findOne({ studentId });
        if (!studentScore) {
            studentScore = new scoreModel({
                studentId,
                points: points,
                literacyRate: determineLiteracyRate(points) 
            });
        } else {
            studentScore.points += points;
            studentScore.literacyRate = determineLiteracyRate(studentScore.points); 
        }

        await studentScore.save();

        return res.status(200).json({ msg: "Answer recorded", isCorrect, points: studentScore.points, literacyRate: studentScore.literacyRate });
    } catch (error) {
        console.error("Error recording answer:", error);
        return res.status(400).json({ error: 'Error recording answer' });
    }
});
// Endpoint to get literacy rate by studentId
quizRouter.get('/literacy-rate', studentMiddleware, async (req, res) => {
    try {
        const studentId = req.userId;
        const studentScore = await scoreModel.findOne({ studentId });
        if (!studentScore) {
            return res.status(404).json({ msg: "Student not found" });
        }
        return res.status(200).json({ literacyRate: studentScore.literacyRate });
    } catch (error) {
        console.error("Error fetching literacy rate:", error);
        return res.status(400).json({ error: 'Error fetching literacy rate' });
    }
});


export default quizRouter;
