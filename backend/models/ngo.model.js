import mongoose from "mongoose";

const NGOSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    }],
    todoRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todo'
    }]
});

const ngoModel=mongoose.model('Ngo',NGOSchema);

export default ngoModel;