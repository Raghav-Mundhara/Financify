import express from 'express';
import zod from 'zod';
import Expense from '../models/expense.model.js';
import studentModel from '../models/student.model.js';
import { studentMiddleware } from '../middlewares/student.js';
import mongoose from 'mongoose';
const expenseRouter = express.Router();

const expenseSchema = zod.object({
    description: zod.string().min(1),
    amount: zod.number().positive(),
    date: zod.date(),  
    category: zod.string().min(1),
    studentId: zod.string().min(1)   
});

expenseRouter.get('/all', studentMiddleware, async (req, res) => {
    try {
        const expenses = await Expense.find({ studentId: req.userId });
        return res.status(200).json(expenses);
    } catch (error) {
        console.error("Error fetching expenses:", error);
        return res.status(400).json({ error: 'Error fetching expenses' });
    }
});

expenseRouter.post('/add', studentMiddleware, async (req, res) => {
    try {
        const parseResult = expenseSchema.safeParse({
            ...req.body,
            date: new Date(req.body.date),  
            studentId: req.userId
        });
        if (!parseResult.success) {
            console.error("Validation error:", parseResult.error);
            return res.status(400).json({ msg: "Invalid Data", error: parseResult.error });
        }
        const expense = new Expense(parseResult.data);
        await expense.save();
        return res.status(201).json(expense);
    } catch (error) {
        console.error("Error adding expense:", error);
        return res.status(400).json({ error: 'Error adding expense' });
    }
});

expenseRouter.put('/update/:id', studentMiddleware, async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ msg: "Invalid ID format" });
    }
    try {
        const parseResult = expenseSchema.safeParse({
            ...req.body,
            date: new Date(req.body.date),  
            studentId: req.userId  
        });
        if (!parseResult.success) {
            console.error("Validation error:", parseResult.error);
            return res.status(400).json({ msg: "Invalid Data", error: parseResult.error });
        }
        const expense = await Expense.findOneAndUpdate(
            { _id: req.params.id, studentId: req.userId },
            parseResult.data,
            { new: true }
        );
        if (!expense) {
            return res.status(404).json({ msg: "Expense not found" });
        }
        return res.status(200).json(expense);
    } catch (error) {
        console.error("Error updating expense:", error);
        return res.status(400).json({ error: 'Error updating expense' });
    }
});

expenseRouter.delete('/delete/:id', studentMiddleware, async (req, res) => {
    try {
        const expense = await Expense.findOneAndDelete({
            _id: req.params.id,
            studentId: req.userId
        });
        if (!expense) {
            return res.status(404).json({ msg: "Expense not found" });
        }
        return res.status(200).json({ msg: "Expense deleted" });
    } catch (error) {
        console.error("Error deleting expense:", error);
        return res.status(400).json({ error: 'Error deleting expense' });
    }
});

export default expenseRouter;
