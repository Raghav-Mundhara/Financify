import mongoose from "mongoose";

const todoSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    completed:{
        type:Boolean
    },
    studentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    },
    point:{
        type:Number,
        require:true,
    }
});
const todoModel=mongoose.model("Todo",todoSchema);

export default todoModel;