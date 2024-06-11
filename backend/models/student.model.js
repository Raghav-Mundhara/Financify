import mongoose from "mongoose";

const StudentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
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
    todos:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Todo'
    },
    virtualCurrency:{
        type:Number,
        default:0
    },
    password:{
        type:String,
        required:true
    }
});

const studentModel= mongoose.model('Student',StudentSchema);

export default studentModel;