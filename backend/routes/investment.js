import express from 'express';
import investmentModel from '../models/investment.model.js';
import { studentMiddleware } from '../middlewares/student.js';

const investmentRouter = express.Router();

investmentRouter.post('/', studentMiddleware, async (req, res) => {
    try {
        console.log('Incoming investment data:', req.body); // Log incoming data

        const { income, risk, roi, literacyRate } = req.body;
        const studentId = req.userId;

        const newInvestment = new investmentModel({
            studentId,
            income,
            risk,
            roi,
            literacyRate
        });

        await newInvestment.save();

        return res.status(200).json({ msg: 'Investment data saved successfully!' });
    } catch (error) {
        console.error('Error saving investment data:', error);
        return res.status(400).json({ error: 'Error saving investment data' });
    }
});

export default investmentRouter;
