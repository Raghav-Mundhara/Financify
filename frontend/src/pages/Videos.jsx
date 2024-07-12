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
                    const student=await axios.get("http://localhost:3000/utils/students");
                    setStudents(student.data);
                })
            } catch (error) {
                console.error("Error fetching videos:", error);
            }
        };
        fetchVideos();
    }, []);

    return (
        <div className='bg-slate-500 h-screen'>
            <div className='flex justify-center py-2'>
                <button className='bg-green-600 rounded-full text-lg p-2 text-bold' onClick={()=>{
                    navigate('/post-video');
                }}>
                    Post Video
                </button>
            </div>
            <div className='py-2 px-2'>
                {loading ? <p>Loading...</p> : videos.map(video => (
                    <div className='bg-white w-max rounded-lg px-2 py-2 mb-2' key={video._id}>
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
                                <p className='text-3xl text-bold'>{video.title}</p>
                                <p>
                                    {students && students.map((student)=>{
                                        if(student._id===video.studentId){
                                            return student.name;
                                        }
                                    })}
                                </p>
                                <p className='text-sm'>{video.description}</p>
                                <div className='flex justify-center'>
                                <p className='text-red-500'>Points required to unlock: {video.point}</p>
                                </div>
                            </div>
                        ) : (
                            <div className='flex flex-col'>
                                <video controls>
                                    <source src={video.url} type="video/mp4" />
                                </video>
                                <p className='text-3xl text-bold'>{video.title}</p>
                                <p>
                                    {students && students.map((student)=>{
                                        if(student._id===video.studentId){
                                            return student.name;
                                        }
                                    })}
                                </p>
                                <p className='text-sm'>{video.description}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Videos;
