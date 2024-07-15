import mongoose from "mongoose";
import { date } from "zod";

const todoSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    },
    points:{
        type:Number,
        require:true,
    },
    date:{
        type:Date,
        default:Date.now
    },
    verifyRequest:{
        type:Boolean,
        default:false
    }
});
const todoModel=mongoose.model("Todo",todoSchema);

export default todoModel;