import express from 'express';
import investmentModel from '../models/investment.model.js';
import { studentMiddleware } from '../middlewares/student.js';
import axios from 'axios';

const investmentRouter = express.Router();

investmentRouter.post('/', studentMiddleware, async (req, res) => {
    try {
        console.log('Incoming investment data:', req.body);

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

        const flaskResponse = await axios.post('http://127.0.0.1:5000/predict', {
            income,
            risk,
            roi,
            literacyRate
        });

        return res.status(200).json({
            msg: 'Investment data saved successfully!',
            prediction: flaskResponse.data.prediction
        });
    } catch (error) {
        console.error('Error saving investment data:', error);
        return res.status(400).json({ error: 'Error saving investment data' });
    }
});

export default investmentRouter;
