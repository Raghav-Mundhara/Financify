import mongoose from 'mongoose';

const ScoreSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
        unique: true
    },
    points: {
        type: Number,
        required: true,
        default: 0
    },
    literacyRate: {
        type: String,
        required: true,
        default: 'low' // Default category
    }
},{ collection: 'scores' });

const scoreModel = mongoose.model('Score', ScoreSchema);

export default scoreModel;
