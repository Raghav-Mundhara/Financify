import express from 'express';
import zod from 'zod';
import jwt from "jsonwebtoken";
import ngoModel from '../models/ngo.model.js';
import dotenv from "dotenv";
import { ngoMiddleware } from '../middlewares/ngo.js';
import studentModel from '../models/student.model.js';
dotenv.config();
const ngoRouter = express.Router();

const registerSchema = zod.object({
    name: zod.string(),
    address: zod.string(),
    email: zod.string().email(),
    password: zod.string(),
    contact: zod.number().min(1000000000).max(9999999999),
});

const signinSchema = zod.object({
    email: zod.string().email(),
    password: zod.string()
});

const studentAddSchema=zod.object({
    name:zod.string(),
    age:zod.number().min(1).max(100),
    income:zod.number(),
    email: zod.string().email()
})
ngoRouter.post('/register', async (req, res) => {
    const parseResult=registerSchema.safeParse(req.body);
    if(!parseResult.success){
        return res.status(400).json({msg:"Invalid Data"});
    }
    try {
        const result=await ngoModel.find({email:req.body.email});
        if(result.length>0){
            return res.status(400).json({msg:"NGO with same email already exists"});
        }
        const NGO=await ngoModel.create({
            email:req.body.email,
            password:req.body.password,
            name:req.body.name,
            address:req.body.address,
            contact:req.body.contact
        });
        const token = jwt.sign({id:NGO._id},process.env.JWT_SECRET);
        return res.status(200).json({token});
    } catch (error) {
        return res.status(400).json({error:"Eror"})
    }
})

ngoRouter.post("/signin", async (req, res) => {
    const parseResult = signinSchema.safeParse(req.body);
    if (parseResult.success) {
        try {
            const NGO = await ngoModel.findOne({
                email: req.body.email,
                password: req.body.password
            });

            if (!NGO) {
                return res.json({
                    msg: "Invalid Credentials"
                });
            }

            const token = jwt.sign({ id: NGO._id }, process.env.JWT_SECRET);
            req.headers.authorization = token;
            return res.json({
                msg: "SignIn Success",
                token
            })
        } catch (err) {
            return res.json({ err })
        }
    } else {
        return res.json({
            msg: "Invalid Data"
        })
    }
})

ngoRouter.get("/home", ngoMiddleware, async (req, res) => {
    var student;
    try {
        student = await studentModel.find();
        return res.status(200).json(student)
    } catch (err) {
        console.log({ "Error": err });
        return res.json(err)
    }
});

ngoRouter.post('/addstudent',ngoMiddleware,async (req,res)=>{
    const parseResult=studentAddSchema.safeParse(req.body);
    if(!parseResult.success){
        return res.status(400).json({msg:"Invalid Data"});
    }
    try {
        const students=await studentModel.find({
            email:req.body.email
        });
        if(students.length<1){
            const student=await studentModel.create({
                name:req.body.name,
                age:req.body.age,
                income:req.body.income,
                ngo:req.userId,
                email:req.body.email
            });
            return res.status(200).json({
                msg:"Student Added!",
                student
            })
        }else{
            return res.status(400).json({msg:"Student with same email already exists!"})
        }
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
})
export default ngoRouter;