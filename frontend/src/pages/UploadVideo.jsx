import axios from 'axios';
import React, { useState } from 'react';

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
        <div className='bg-slate-200 h-screen flex justify-center items-center'>
            <div className="bg-white max-w-md mx-auto p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
                <form>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="mt-2 p-2 w-full border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700">Description:</label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-2 p-2 w-full border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="video" className="block text-gray-700">Video:</label>
                        <input
                            type="file"
                            id="video"
                            onChange={handleVideo}
                            className="mt-2 p-2 w-full border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="point" className="block text-gray-700">Point:</label>
                        <input
                            type="number"
                            id="point"
                            value={point}
                            onChange={(e) => setPoint(e.target.value)}
                            className="mt-2 p-2 w-full border rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Upload
                    </button>
                </form>
            </div>
        </div>
    )
}
