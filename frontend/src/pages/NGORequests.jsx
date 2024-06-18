import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                authorization: `${token}`,
            },
        };
        try {
            const { data } = await axios.get(`http://localhost:3000/utils/student/${id}`, config);
            return data;
        } catch (error) {
            alert('Error:', error);
        }
    };

    useEffect(() => {
        console.log('useEffect');
        getRequests();
        console.log('requests', requests);
        requests.map(async (request) => {
            const student = await getStudents(request);
            setStudents([...students, student]);
        });
    }, []);


    return (
        <div>
            <h1>NGO Requests</h1>
            {console.log(students)}
            <div>
                {students.map((student, index) => (
                    <div key={index}>
                        <h2>{student.name}</h2>
                        <p>{student.details}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
