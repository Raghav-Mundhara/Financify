import express from 'express';
import multer from 'multer';
import videoModel from '../models/video.model.js';
import { studentMiddleware } from '../middlewares/student.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const videoRouter = express.Router();

// Multer setup for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// Endpoint for uploading video
videoRouter.post('/upload', studentMiddleware, upload.single('video'), async (req, res) => {
    try {
        const { title, description } = req.body;
        const video = req.file;

        // Check if the file exists
        if (!video) {
            return res.status(400).json({ error: 'No video file uploaded' });
        }

        // Ensure the file is a valid video format
        const validFormats = ['video/mp4', 'video/webm', 'video/ogg'];
        if (!validFormats.includes(video.mimetype)) {
            return res.status(400).json({ error: 'Unsupported video format' });
        }

        console.log("Video:", video);
        const uploadVideo = await cloudinary.uploader.upload(video.path, {
            resource_type: 'video',
            folder: 'videos'
        });

        const newVideo = new videoModel({
            title,
            description,
            url: uploadVideo.secure_url,
            studentId: req.userId,
            point: req.body.point || 0,
        });

        await newVideo.save();

        // Clean up the file after upload
        fs.unlinkSync(video.path);

        res.status(201).json({ msg: 'Video uploaded successfully' });
    } catch (error) {
        console.error("Error uploading video:", error);
        res.status(400).json({ error: 'Error uploading video' });
    }
});

export default videoRouter;
