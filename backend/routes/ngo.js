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


ngoRouter.post('/register', async (req, res) => {
    try {
        const parseResult = registerSchema.safeParse(req.body);
        const { name, address, email, password, contact } = req.body;
        if (parseResult.success) {
            try {
                const NGO = await ngoModel.create({
                    name,
                    address,
                    email,
                    password,
                    contact
                });
                console.log(NGO._id);
                const token = jwt.sign({ id: NGO._id }, process.env.JWT_SECRET);
                res.json({ token });
            } catch (error) {
                res.json({ error: error });
            }
        }
    } catch (error) {
        return res.json(error);
    }
});


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

ngoRouter.get("/student", ngoMiddleware, async (req, res) => {
    var student;
    try {
        student = await ngoModel.find();
        return res.status(200).json(student)
    } catch (err) {
        console.log({ "Error": err });
        return res.json(err)
    }
});
export default ngoRouter;