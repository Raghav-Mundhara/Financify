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
    }]

});

const ngoModel=mongoose.model('Ngo',NGOSchema);

export default ngoModel;