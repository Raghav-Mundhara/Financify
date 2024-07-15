import axios from 'axios';
import React from 'react'
import { useState } from 'react';
export const UploadVideo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [video, setVideo] = useState(null);
    const [point, setPoint] = useState(0);

    const handleVideo = (e) => {
        setVideo(e.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('video', video);
        formData.append('point', point);
        console.log(formData);
        try {
            const response = await axios.post('http://localhost:3000/videos/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': localStorage.getItem('token')
                }
            });
            console.log(response.data);
            setTitle('');
            setDescription('');
            setVideo(null);
            setPoint(0);
            alert('Video uploaded successfully');
        } catch (error) {
            console.error("Error uploading video:", error);
        }
    }
    return (
        <div>
            <h1>Upload Video</h1>
            <form>
                <div >
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="video">Video:</label>
                    <input type="file" id="video" onChange={handleVideo} />
                </div>
                <div>
                    <label htmlFor="point">Point:</label>
                    <input type="number" id="point" value={point} onChange={(e) => setPoint(e.target.value)} />
                </div>
                <button type="submit" onClick={handleSubmit}>Upload</button>
            </form>
        </div>
    )
}
