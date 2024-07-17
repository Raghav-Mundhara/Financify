import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    point: {
        type: Number,
        required: true,
    },
},{
    timestamps: true
});

const videoModel = new mongoose.model("Video", VideoSchema);

export default videoModel;