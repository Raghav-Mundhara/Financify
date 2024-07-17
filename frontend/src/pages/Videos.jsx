import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Videos = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/videos/', {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                });
                setVideos(response.data);
                setLoading(false);
                response.data.map(async (video) => {
                    const student = await axios.get("http://localhost:3000/utils/students");
                    setStudents(student.data);
                })
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };
        fetchVideos();
    }, []);

    return (
        <div className='bg-slate-300 min-h-screen'>
            <div className='flex justify-center py-4'>
                <button
                    className='bg-green-600 rounded-full text-lg p-2 font-bold'
                    onClick={() => {
                        navigate('/post-video');
                    }}
                >
                    Post Video
                </button>
            </div>
            <div className='py-4 px-8'>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {videos.map(video => (
                            <div className='bg-white rounded-lg p-4 shadow-lg' key={video._id}>
                                {video.point > 0 ? (
                                    <div className='flex flex-col'>
                                        <div className='relative'>
                                            <video className='opacity-50'>
                                                <source src={video.url} type="video/mp4" />
                                            </video>
                                            <div className='absolute inset-0 flex items-center justify-center'>
                                                <span className='text-4xl'>🔒</span>
                                            </div>
                                        </div>
                                        <p className='text-2xl font-bold mt-2'>{video.title}</p>
                                        <p className='text-gray-600'>
                                            {students && students.map(student => (
                                                student._id === video.studentId && student.name
                                            ))}
                                        </p>
                                        <p className='text-sm text-gray-500'>{video.description}</p>
                                        <div className='flex justify-center mt-2'>
                                            <p className='text-red-500'>Points required to unlock: {video.point}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex flex-col'>
                                        <video controls>
                                            <source src={video.url} type="video/mp4" />
                                        </video>
                                        <p className='text-2xl font-bold mt-2'>{video.title}</p>
                                        <p className='text-gray-600'>
                                            {students && students.map(student => (
                                                student._id === video.studentId && student.name
                                            ))}
                                        </p>
                                        <p className='text-sm text-gray-500'>{video.description}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Videos;
