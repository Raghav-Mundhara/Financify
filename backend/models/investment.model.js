import mongoose from 'mongoose';

const InvestmentSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    income: {
        type: String,
        required: true
    },
    risk: {
        type: String,
        required: true
    },
    roi: {
        type: String,
        required: true
    },
    literacyRate: {
        type: String,
        required: true
    }
}, { collection: 'investments' });

const investmentModel = mongoose.model('Investment', InvestmentSchema);

export default investmentModel;
