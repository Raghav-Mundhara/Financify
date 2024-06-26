import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NgoHeader from '../components/NgoHeader';

export default function NGORequests() {
    const [requests, setRequests] = useState([]);
    const [students, setStudents] = useState([]);

    const getRequests = async () => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                authorization: `${token}`,
            },
        };
        try {
            const { data } = await axios.get('http://localhost:3000/ngo/getRequest', config);
            setRequests(data);
        } catch (error) {
            alert('Error:', error);
        }
    };

    const getStudents = async (id) => {
        console.log('id', id);
        const token = localStorage.getItem('token');

        const config = {
            headers: {
                authorization: `${token}`,
            },
        };
        try {
            const { data } = await axios.get(`http://localhost:3000/utils/student/${id}`, {}, config);
            return data;
        } catch (error) {
            alert('Error:', error);
        }
    };

    const onApproveClick = async (id) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                authorization: `${token}`,
            },
        };
        console.log(config);
        try {
            const response = await axios.put(`http://localhost:3000/ngo/approveStudent/${id}`, {}, config);
            alert('Student Approved');
            window.location.reload();
        } catch (error) {
            alert('Error:', error);
        }
    }

    const onRejectClick = async (id) => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                authorization: `${token}`,
            },
        };
        try {
            const response = await axios.put(`http://localhost:3000/ngo/rejectStudent/${id}`, {}, config);
            alert('Student Rejected');
            window.location.reload();
        } catch (error) {
            alert('Error:', error);
        }

    }
    useEffect(() => {
        console.log('useEffect');
        getRequests();
        console.log('requests', requests);
    }, []);

    useEffect(() => {
        requests.map(async (request) => {
            const student = await getStudents(request);
            setStudents([student]);
        });
    }, [requests])

    return (
        <div>
            <NgoHeader count={requests.length} />
            <div className='py-2'>
                <div className='flex border-2 mx-4 rounded-lg bg-slate-300 shadow-xl w-max'>
                    <div className='flex-1 flex justify-start'>
                        {students.length > 0 ? students.map((student, index) => (
                            <div key={index} className='flex p-4'>
                                <div>
                                    <h2 className='text-3xl text-bold'>Name:-{student.name}</h2>
                                    <p>Email:-{student.email}</p>
                                    <p>Age:-{student.age} Y/O</p>
                                    <p>Income:-{student.income}</p>
                                    <p>Address:-{student.address}</p>
                                </div>
                                <div className='flex flex-col justify-center items-center p-4'>
                                    <button className='mb-2 bg-green-700 rounded-md px-2 py-2 text-white' onClick={() => {
                                        onApproveClick(student._id);
                                    }}>Approve</button>
                                    <button className='mb-2 bg-red-700 rounded-md px-2 py-2 text-white' onClick={() => {
                                        onRejectClick(student._id);
                                    }}>Reject</button>
                                </div>
                            </div>
                        )) : 
                        <div className='flex justify-center items-center p-4'>
                            <h2>No Pending Requests</h2>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
