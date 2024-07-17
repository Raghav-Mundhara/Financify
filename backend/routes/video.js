import express from 'express';
import multer from 'multer';
import videoModel from '../models/video.model.js';
import { studentMiddleware } from '../middlewares/student.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
import studentModel from '../models/student.model.js';

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
        fs.unlinkSync(video.path);
        res.status(201).json({ msg: 'Video uploaded successfully' });
    } catch (error) {
        console.error("Error uploading video:", error);
        res.status(400).json({ error: 'Error uploading video' });
    }
});

// Endpoint for fetching all videos
videoRouter.get('/', async (req, res) => {
    try {
        const videos = await videoModel.find();
        res.status(200).json(videos);
    } catch (error) {
        console.error("Error fetching videos:", error);
        res.status(400).json({ error: 'Error fetching videos' });
    }
});


videoRouter.post('/buy-video', studentMiddleware, async (req, res) => {
    try {
        const videoId = req.body.videoId;
        const studentId = req.userId;
        const video = await videoModel.findById(videoId);
        if (!video) {
            return res.status(404).json({ error: 'Video not found' });
        }

        const student = await studentModel.findById(studentId);
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        
        if (student.virtualCurrency < video.point) {
            return res.status(400).json({ error: 'Insufficient virtual currency' });
        }
        
        student.virtualCurrency -= video.point;
        student.videos.push(videoId);
        await student.save();
        res.status(200).json({ msg: 'Video purchased successfully' });
    } catch (error) {
        console.error("Error buying video:", error);
        res.status(400).json({ error: 'Error buying video' });
    }
});
export default videoRouter;
