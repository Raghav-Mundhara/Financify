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
                        'Authorization': `${token}`
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
                    <div className='text-left px-4'>
                        <p><strong>Name:</strong> {student.name}</p>
                        <p><strong>Email:</strong> {student.email}</p>
                        <p><strong>Age:</strong> {student.age}</p>
                        <p><strong>Income:</strong> {student.income}</p>
                        <p><strong>Virtual Currency:</strong> {student.virtualCurrency}</p>
                        <p><strong>NGO:</strong> {ngo.name}</p>
                    </div>
                    <div>
                        <button onClick={()=>{
                            navigate('/expenses');
                        }}>
                            Expense
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
