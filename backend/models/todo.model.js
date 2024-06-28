import mongoose from "mongoose";

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
    }
});
const todoModel=mongoose.model("Todo",todoSchema);

export default todoModel;