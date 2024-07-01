import React, { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Expense() {
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({
        description: '',
        amount: '',
        date: '',
        category: ''
    });
    const [selectedExpense, setSelectedExpense] = useState(null);
    const [showExpenses, setShowExpenses] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('http://localhost:3000/expense/all', {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });
            setExpenses(response.data);
        } catch (error) {
            console.error("Error fetching expenses:", error);
            alert(error.response?.data?.error || error.message);
        }
    };

    const handleAddExpense = async () => {
        try {
            await axios.post('http://localhost:3000/expense/add', {
                ...newExpense,
                amount: parseFloat(newExpense.amount),
                date: new Date(newExpense.date)
            }, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });
            setNewExpense({
                description: '',
                amount: '',
                date: '',
                category: ''
            });
            fetchExpenses();
        } catch (error) {
            console.error("Error adding expense:", error);
            alert(error.response?.data?.error || error.message);
        }
    };

    const handleUpdateExpense = async () => {
        try {
            await axios.put(`http://localhost:3000/expense/update/${selectedExpense._id}`, {
                ...newExpense,
                amount: parseFloat(newExpense.amount),
                date: new Date(newExpense.date)
            }, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });
            setNewExpense({
                description: '',
                amount: '',
                date: '',
                category: ''
            });
            setSelectedExpense(null);
            fetchExpenses();
        } catch (error) {
            console.error("Error updating expense:", error);
            alert(error.response?.data?.error || error.message);
        }
    };

    const handleDeleteExpense = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/expense/delete/${id}`, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });
            fetchExpenses();
        } catch (error) {
            console.error("Error deleting expense:", error);
            alert(error.response?.data?.error || error.message);
        }
    };

    return (
        <div className='bg-navy-800 h-full flex'>
            <div className='flex justify-center'>
                <div>
                    <div className='rounded-lg bg-white text-center p-4 border border-red-900'>
                        <Heading title="Expenses" />
                        <SubHeading subheading="Manage your expenses" />
                        <div className='text-left px-4'>
                            <div className='mb-4'>
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={newExpense.description}
                                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                                    className='mb-2 p-2 border rounded w-full'
                                />
                            </div>
                            <div className='mb-4'>
                                <input
                                    type="number"
                                    placeholder="Amount"
                                    value={newExpense.amount}
                                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                                    className='mb-2 p-2 border rounded w-full'
                                />
                            </div>
                            <div className='mb-4'>
                                <input
                                    type="date"
                                    placeholder="Date"
                                    value={newExpense.date}
                                    onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                                    className='mb-2 p-2 border rounded w-full'
                                />
                            </div>
                            <div className='mb-4'>
                                <input
                                    type="text"
                                    placeholder="Category"
                                    value={newExpense.category}
                                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                                    className='mb-2 p-2 border rounded w-full'
                                />
                            </div>
                            {selectedExpense ? (
                                <button
                                    onClick={handleUpdateExpense}
                                    className='bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-700 transition duration-300 w-full'
                                >
                                    Update Expense
                                </button>
                            ) : (
                                <button
                                    onClick={handleAddExpense}
                                    className='bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 w-full'
                                >
                                    Add Expense
                                </button>
                            )}
                        </div>
                    </div>
                    <div className='mt-4 flex justify-center'>
                        <button
                            className='bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300'
                            onClick={() => navigate('/rewards')}
                            >
                            Claim your reward!
                        </button>
                    </div>
                </div>
                <div className='mx-5'>
                    {showExpenses && (
                        <div className='rounded-lg bg-white text-center p-4'>
                            <Heading title="Your Expenses" />
                            <ul className='text-left'>
                                {expenses.map((expense) => (
                                    <li key={expense._id} className='mb-4 p-2 border-b'>
                                        <p><strong>Description:</strong> {expense.description}</p>
                                        <p><strong>Amount:</strong> {expense.amount}</p>
                                        <p><strong>Date:</strong> {new Date(expense.date).toLocaleDateString()}</p>
                                        <p><strong>Category:</strong> {expense.category}</p>
                                        <button
                                            onClick={() => handleDeleteExpense(expense._id)}
                                            className='bg-red-500 text-white py-1 px-2 rounded-full hover:bg-red-700 transition duration-300 mr-2'
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => {
                                                setSelectedExpense(expense);
                                                setNewExpense({
                                                    description: expense.description,
                                                    amount: expense.amount,
                                                    date: expense.date.substring(0, 10),
                                                    category: expense.category
                                                });
                                            }}
                                            className='bg-yellow-500 text-white py-1 px-2 rounded-full hover:bg-yellow-700 transition duration-300'
                                        >
                                            Edit
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
