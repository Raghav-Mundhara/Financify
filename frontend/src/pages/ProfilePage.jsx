import React, { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [student, setStudent] = useState(null);
    const [ngo, setNgo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchStudentData() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate('/signin-student');
                    return;
                }
                const response = await axios.get('http://localhost:3000/student/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setStudent(response.data.student);
                setNgo(response.data.ngo);
            } catch (error) {
                alert(error.message);
                navigate('/signin-student');
            }
        }
        fetchStudentData();
    }, [navigate]);

    if (!student || !ngo) return <div>Loading...</div>;

    return (
        <div className='bg-navy-800 h-screen flex justify-center pt-10'>
            <div className='flex flex-column justify-center'>
                <div className='rounded-lg bg-white text-center p-2 h-max px-4'>
                    <Heading title="Profile" />
                    <SubHeading subheading="Your account details" />
                    <div className='mt-4'>
                        <div className='py-2'>
                            <strong>Name:</strong> {student.name}
                        </div>
                        <div className='py-2'>
                            <strong>Email:</strong> {student.email}
                        </div>
                        <div className='py-2'>
                            <strong>Age:</strong> {student.age}
                        </div>
                        <div className='py-2'>
                            <strong>Income:</strong> {student.income}
                        </div>
                        <div className='py-2'>
                            <strong>Virtual Currency:</strong> {student.virtualCurrency}
                        </div>
                        <div className='py-2'>
                            <strong>NGO:</strong> {ngo.name}
                        </div>
                        <div className='mt-4'>
                            <button
                                className='bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300'
                                onClick={() => navigate(`/student-todos/${student._id}`)}
                            >
                                Track my Chores
                            </button>

                            <button
                                className='bg-green-600 text-white py-2 px-4 rounded-full hover:bg-green-700 transition duration-300 block'
                                onClick={() => navigate('/quiz')}
                                style={{ marginTop: '10px' }}
                            >
                                Take a Quiz
                            </button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
