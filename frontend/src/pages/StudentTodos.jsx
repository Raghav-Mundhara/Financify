import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import StudentHeader from '../components/StudentHeader';

const StudentTodos = () => {
    const [student, setStudent] = useState(null);
    const [todos, setTodos] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    const fetchTodos = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/todo/get/${params.id}`, {
                headers: {
                    'Authorization': localStorage.getItem("token")
                }
            });
            response.data.sort((a, b) => a.points - b.points)
            setTodos(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        async function fetchStudentData() {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate('/signin-student');
                    return;
                }
                const response = await axios.get(`http://localhost:3000/utils/student/${params.id}`, {
                    headers: {
                        'Authorization': `${token}`
                    }
                });
                setStudent(response.data);
            } catch (error) {
                alert(error.message);
                navigate('/signin-student');
            }
        }
        fetchStudentData();
        fetchTodos();
    }, []);

    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayStr = formatDate(today);
    const tomorrowStr = formatDate(tomorrow);

    const todayTodos = todos.filter(todo => todo.date.startsWith(todayStr));
    const tomorrowTodos = todos.filter(todo => todo.date.startsWith(tomorrowStr));

    return (
        <div>
            {/* <StudentHeader student={student} /> */}
            <div className='flex justify-around bg-navy h-screen'>
                <div>
                    <h2 className='text-3xl text-bold text-white'>Today's Todos</h2>
                    <TodoCard todos={todayTodos} />
                </div>
                <div>
                    <h2 className='text-3xl text-bold text-white'>Tomorrow's Todos</h2>
                    <TodoCard todos={tomorrowTodos} />
                </div>
            </div>
        </div>
    );
};

const TodoCard = ({ todos }) => {
    return (
        <div className='bg-amber-500 w-max rounded-xl px-2 py-2'>
            {todos.map((todo) => (
                <div key={todo._id}>
                    <h3 className='text-xl'>{todo.title}</h3>
                    <p className='text-md'>{todo.description}</p>
                    <p className='text-md'>{todo.points} points</p>
                    <p className='text-md'>{todo.completed ? "Completed" : "Pending"}</p>
                    {todo.completed ? null : <button className='bg-navy text-white px-2 rounded-lg my-2'>Send for verification</button>}
                </div>
            ))}
        </div>
    );
}

export default StudentTodos;
