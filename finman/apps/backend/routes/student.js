import express from 'express';
import zod from 'zod';
import jwt from "jsonwebtoken";
import studentModel from '../models/student.model.js';
import ngoModel from '../models/ngo.model.js';
import todoModel from '../models/todo.model.js';
import dotenv from "dotenv";
import { ngoMiddleware } from '../middlewares/ngo.js'; // Make sure this middleware is defined
dotenv.config();
const studentRouter = express.Router();

const registerSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    age: zod.number().min(1).max(100),
    income: zod.number(),
    address: zod.string(),
    password: zod.string().min(6),
    // ngoId: zod.string(), 
    // virtualCurrency: zod.number().default(0)
});

const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string()
});


//Student Register (Working)
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
            password: req.body.password,
            address: req.body.address,
        });

        await ngoModel.findByIdAndUpdate(
            req.body.ngoId,
            {
                $push:
                    { requests: student._id }
            }
        )

        const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET);
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(400).json({ error: "Error" });
    }
});

//Student SignIn (Working)
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
            if(!student.ngo){
                return res.status(400).json({msg:"NGO not approved your request yet"});
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

//Student Dashboard (Working)
studentRouter.get("/profile", ngoMiddleware, async (req, res) => {
    try {
        const student = await studentModel.findById(req.userId);
        const ngo = await ngoModel.findById(student.ngo);
        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }
        return res.status(200).json({student, ngo});
    } catch (err) {
        console.log({ "Error": err });
        return res.status(400).json(err);
    }
});

studentRouter.put('/updatePoints', ngoMiddleware, async (req, res) => {
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


studentRouter.get('/todos', ngoMiddleware, async (req, res) => {
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

studentRouter.get('/calculate-savings', ngoMiddleware, async (req, res) => {
    try {
        const student = await studentModel.findById(req.userId);
        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }

        // Get expenses for the current month
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const expenses = await expenseModel.find({ 
            studentId: req.userId, 
            date: { $gte: startOfMonth } 
        });

        const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
        const savings = student.income - totalExpenses;

        // Check if savings are within 25% - 30% of income
        const minSavings = student.income * 0.25;
        const maxSavings = student.income * 0.30;
        const isEligibleForReward = savings >= minSavings && savings <= maxSavings;

        return res.status(200).json({
            isEligibleForReward,
            savings,
            virtualCurrency: student.virtualCurrency
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server Error" });
    }
});

// New route to add reward to virtual currency
studentRouter.put('/add-reward', ngoMiddleware, async (req, res) => {
    try {
        const student = await studentModel.findById(req.userId);
        if (!student) {
            return res.status(404).json({ msg: "Student not found" });
        }

        // Get expenses for the current month
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const expenses = await expenseModel.find({ 
            studentId: req.userId, 
            date: { $gte: startOfMonth } 
        });

        const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
        const savings = student.income - totalExpenses;

        const minSavings = student.income * 0.25;
        const maxSavings = student.income * 0.30;
        const isEligibleForReward = savings >= minSavings && savings <= maxSavings;

        if (isEligibleForReward) {
            student.virtualCurrency += 350;
            await student.save();
            return res.status(200).json({ msg: "Reward granted", virtualCurrency: student.virtualCurrency });
        } else {
            return res.status(400).json({ msg: "Not eligible for reward" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server Error" });
    }
});




export default studentRouter;
