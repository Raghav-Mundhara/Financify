import express from 'express';
import zod from 'zod';
import jwt from "jsonwebtoken";
import studentModel from '../models/student.model.js';
import ngoModel from '../models/ngo.model.js';
import todoModel from '../models/todo.model.js';
import dotenv from "dotenv";
import { studentMiddleware } from '../middlewares/student.js'; // Make sure this middleware is defined
dotenv.config();
const studentRouter = express.Router();

const registerSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    age: zod.number().min(1).max(100),
    income: zod.number(),
    address: zod.string(),
    // ngoId: zod.string(), 
    // virtualCurrency: zod.number().default(0)
});

const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string()
});



studentRouter.post('/register', async (req, res) => {
    const parseResult = registerSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ msg: "Invalid Data" });
    }
    try {
        const ngo = await ngoModel.findById(req.body.ngoId);
        if (!ngo) {
            return res.status(400).json({ msg: "NGO not found" });
        }
        const existingStudent = await studentModel.findOne({ email: req.body.email });
        if (existingStudent) {
            return res.status(400).json({ msg: "Student with same email already exists!" });
        }
        const student = await studentModel.create({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            income: req.body.income,
            address: req.body.address,
            ngo: req.body.ngoId,
            // virtualCurrency: req.body.virtualCurrency
        });
        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(400).json({ error: "Error" });
    }
});

studentRouter.post("/signin", async (req, res) => {
    const parseResult = signinSchema.safeParse(req.body);
    if (parseResult.success) {
        try {
            const student = await studentModel.findOne({
                email: req.body.email,
                password: req.body.password
            });

            if (!student) {
                return res.status(400).json({ msg: "Invalid Credentials" });
            }

            const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
            req.headers.authorization = token;
            return res.status(200).json({ msg: "SignIn Success", token });
        } catch (err) {
            return res.status(400).json({ err });
        }
    } else {
        return res.status(400).json({ msg: "Invalid Data" });
    }
});

studentRouter.get("/profile", studentMiddleware, async (req, res) => {
    try {
        const student = await studentModel.findById(req.userId).populate('ngo', 'name');
        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }
        return res.status(200).json(student);
    } catch (err) {
        console.log({ "Error": err });
        return res.status(400).json(err);
    }
});

studentRouter.put('/updatePoints', studentMiddleware, async (req, res) => {
    const { amount } = req.body;
    if (typeof amount !== 'number') {
        return res.status(400).json({ msg: "Invalid amount" });
    }
    try {
        const student = await studentModel.findById(req.userId);
        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }
        student.virtualCurrency += amount;
        await student.save();
        return res.status(200).json({ msg: "Points updated", virtualCurrency: student.virtualCurrency });
    } catch (error) {
        return res.status(400).json({ error: "Error" });
    }
});


studentRouter.get('/todos', studentMiddleware, async (req, res) => {
    try {
        const { todoId, action } = req.query;
        if (action === 'markComplete') {
            
            const todo = await todoModel.findById(todoId);
            if (!todo) {
                return res.status(404).json({ msg: "Todo not found" });
            }
            if (todo.studentId.toString() !== req.userId) {
                return res.status(403).json({ msg: "Not authorized to update this todo" });
            }
            todo.completed = true;
            await todo.save();
            return res.status(200).json({ msg: "Todo marked as complete", todo });
        } else {
            
            const todos = await todoModel.find({ studentId: req.userId });
            return res.status(200).json(todos);
        }
    } catch (error) {
        return res.status(400).json({ error: "Error processing request" });
    }
});





export default studentRouter;
