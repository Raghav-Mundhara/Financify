import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import NgoHeader from '../components/NgoHeader'
import InputBox from '../components/InputBox'
import Button from '../components/Button';
import axios from 'axios';

function NgoStudent() {
    const params = useParams();
    const [selectedPoint, setSelectedPoint] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [student, setStudent] = useState({});
    const [todos, setTodos] = useState([]);
    const [date, setDate] = useState(Date.now());
    const handleOptionChange = (event) => {
        setSelectedPoint(event.target.value);
    };

    const handleStatusChange = async (id, completed) => {
        try {
            const response = await axios.put(`http://localhost:3000/todo/update/${params.id}/${id}`, {
                completed: !completed
            }, {
                headers: {
                    authorization: `${localStorage.getItem('token')}`
                }
            });
            getTodos();
        } catch (error) {
            alert('Error:', error);
        }
    }

    const addTodo = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/todo/add/${params.id}`, {
                title: title,
                description: description,
                points: Number(selectedPoint),
                date: date
            }, {
                headers: {
                    authorization: `${localStorage.getItem('token')}`
                }
            });
            getTodos();
        } catch (error) {
            alert('Error:', error);
        }
    }
    const getTodos = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/todo/get/${params.id}`, {
                headers: {
                    authorization: `${localStorage.getItem('token')}`
                }
            });
            setTodos(response.data);
        } catch (error) {
            alert('Error:', error);
        }
    }
    const deleteTodo = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/todo/delete/${params.id}/${id}`, {
                headers: {
                    authorization: `${localStorage.getItem('token')}`
                }
            });
            getTodos();
        } catch (error) {
            alert('Error:', error);
        }
    }
    useState(() => {
        const getStudent = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/utils/student/${params.id}`, {
                    headers: {
                        authorization: `${localStorage.getItem('token')}`
                    }
                });
                setStudent(response.data);
            } catch (error) {
                alert('Error:', error);
            }
        }
        getStudent();
        getTodos();
    }, [])
    return (
        <div className='min-h-screen flex flex-col bg-amber-200'>
            <div>
                <NgoHeader />
            </div>
            <div className='flex flex-1 justify-start items-center'>
                <div className='h-full flex justify-center items-center'>
                    <div className='bg-navy h-screen px-2 flex flex-col justify-center'>
                        <div className='flex justify-center py-2'>
                            <h1 className='text-2xl font-bold text-white '>Add Todo for {student.name}</h1>
                        </div>
                        <div className='flex justify-center py-5'>
                            <div className='px-2 bg-amber-200 rounded-2xl w-full'>
                                <InputBox label='Title' type='text' onChange={(e) => {
                                    setTitle(e.target.value);
                                }} />
                                <InputBox label='Description' type='text' onChange={(e) => {
                                    setDescription(e.target.value);
                                }} />
                                <div className='flex space-x-2 pt-2 '>
                                    Points:- &nbsp;
                                    <div className='flex'>
                                        <input
                                            type="radio"
                                            id="1"
                                            name="1 VC"
                                            value="1"
                                            checked={selectedPoint === '1'}
                                            onChange={handleOptionChange}
                                        />
                                        <label htmlFor="option1">1 VC</label>
                                    </div>
                                    <div className='flex'>
                                        <input
                                            type="radio"
                                            id="2"
                                            name="2 VC"
                                            value="2"
                                            checked={selectedPoint === '2'}
                                            onChange={handleOptionChange}
                                        />
                                        <label htmlFor="option2">2 VC</label>
                                    </div>
                                    <div className='flex'>
                                        <input
                                            type="radio"
                                            id="3"
                                            name="3 VC"
                                            value="3"
                                            checked={selectedPoint === '3'}
                                            onChange={handleOptionChange}
                                        />
                                        <label htmlFor="option3">3 VC</label>
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <p>Date:- &nbsp;</p>
                                    <input type="date" name="date" id="date" className='mt-2 ' onChange={(e)=>{
                                        setDate(e.target.value);
                                        console.log(e.target.value);
                                    }} />
                                </div>
                                <Button label="ADD" onClick={() => {
                                    addTodo();
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='h-screen'>
                    <div>
                        {todos.map((todo) => {
                            return (
                                <div key={todo._id} className='bg-navy m-2 p-2 rounded-lg'>
                                    <div className='flex items-center'>
                                        <h1 className='text-white text-xl text-bold'>{todo.title}</h1>
                                        <div className='ml-2 cursor-pointer' style={{ width: '20px', height: '20px' }} onClick={() => {
                                            deleteTodo(todo._id);
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="delete" style={{ width: '100%', height: '100%' }}>
                                                <path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z" fill='#FF0000'></path>
                                            </svg>
                                        </div>
                                    </div>

                                    <p className='text-white'>{todo.description}</p>
                                    <p className='text-white'>{todo.points} VC</p>
                                    <div className='flex'>
                                        {todo.verifyRequest ? <div className='flex'>
                                            <input
                                            type="checkbox"
                                            id="status"
                                            name="status"
                                            checked={todo.completed}
                                            onChange={() => {
                                                handleStatusChange(todo._id, todo.completed);
                                            }} />
                                            &nbsp;
                                            <p className='text-white'>Request Pending</p>
                                        </div> :  <p className='text-white'>Not Completed</p>}
                                        {todo.completed ? <p className='text-white'>Completed</p> :null}
                                    </div>
                                </div>

                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NgoStudent