import mongoose from "mongoose";

const StudentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true
    },
    income:{
        type:Number,
        required:true
    },
    ngo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'NGO'
    },
    address:{
        type:String,
    },
    todos:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Todo'
    },
    virtualCurrency:{
        type:Number
    }
});

const studentModel= mongoose.model('Student',StudentSchema);

export default studentModel;