import express from "express"
import ngoModel from "../models/ngo.model.js";
import studentModel from "../models/student.model.js";
const utilRouter = express.Router();

utilRouter.get("/ngos",async(req,res)=>{
    try{
        // console.log("Getting all ngos");
        const ngos=await ngoModel.find();
        console.log(ngos);
        return res.status(200).json(ngos);
    }catch(err){
        return res.status(400).json({err});
    }
});

utilRouter.get("/students",async(req,res)=>{
    try{
        const students=await ngoModel.find();
        // console.log(students);
        return res.status(200).json(students);
    }catch(err){
        return res.status(400).json({err});
    }
})

utilRouter.get("/student/:id",async(req,res)=>{
    try{
        const student=await studentModel.findById(req.params.id);
        // console.log(student);
        return res.status(200).json(student);
    }catch(err){
        return res.status(400).json({err});
    }
})

utilRouter.get("/ngo/:id",async(req,res)=>{
    try{
        const ngo=await ngoModel.findById(req.params.id);
        // console.log(ngo);
        return res.status(200).json(ngo);
    }catch(err){
        return res.status(400).json({err});
    }
})

export default utilRouter;