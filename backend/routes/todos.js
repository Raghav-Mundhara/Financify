import mongoose from 'mongoose';
import express from 'express';
import zod from 'zod';
import todoModel from '../models/todo.model.js';
import {studentMiddleware} from '../middlewares/student.js';
import {ngoMiddleware} from '../middlewares/ngo.js';
const todoSchema=zod.object({
    title:zod.string(),
    description:zod.string(),
    points:zod.number(),
});


const todoRouter=express.Router();
//Add Todo
todoRouter.post('/add/:studentID',ngoMiddleware,async (req,res)=>{
    const parseResult=todoSchema.safeParse(req.body);
    if(!parseResult.success){
        return res.status(400).json({msg:"Invalid Data"});
    }
    try {
        const todo=await todoModel.create({
            studentId:req.userId,
            title:req.body.title,
            description:req.body.description,
            points:req.body.points,
            completed:false
        });
        return res.status(200).json(todo);
    } catch (error) {
        return res.status(400).json({error:"Error"})
    }
})

//Get All Todos
todoRouter.get('/get/:studentID',ngoMiddleware,async (req,res)=>{
    try {
        const todos=await todoModel.find({studentId:req.params.studentID});
        return res.status(200).json(todos);
    } catch (error) {
        return res.status(400).json({error:"Error"})
    }
});

//Update Todo
todoRouter.put('/update/:studentID/:id',ngoMiddleware,async (req,res)=>{
    const parseResult=todoSchema.safeParse(req.body);
    if(!parseResult.success){
        return res.status(400).json({msg:"Invalid Data"});
    }
    try {
        const todo=await todoModel.findOneAndUpdate({_id:req.params.id,studentId:req.params.studentID},{
            title:req.body.title,
            description:req.body.description,
            points:req.body.points,
            completed:req.body.completed
        },{new:true});
        return res.status(200).json(todo);
    } catch (error) {
        return res.status(400).json({error:"Error"})
    }
});

//Delete Todo
todoRouter.delete('/delete/:studentID/:id',ngoMiddleware,async (req,res)=>{
    try {
        const todo=await todoModel.findOneAndDelete({_id:req.params.id,studentId:req.params.studentID});
        return res.status(200).json(todo);
    }
    catch (error) {
        return res.status(400).json({error:"Error"})
    }
});

export default todoRouter;