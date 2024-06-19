import React, { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Expense() {
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({});
    const [selectedExpense, setSelectedExpense] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('http://localhost:3000/expense/all');
            setExpenses(response.data);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleAddExpense = async () => {
        try {
            await axios.post('http://localhost:3000/expense/add', newExpense);
            setNewExpense({});
            fetchExpenses();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleUpdateExpense = async () => {
        try {
            await axios.put(`http://localhost:3000/expense/update/${selectedExpense.id}`, newExpense);
            setNewExpense({});
            setSelectedExpense(null);
            fetchExpenses();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteExpense = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/expense/delete/${id}`);
            fetchExpenses();
        } catch (error) {
            alert(error.message);
        }
    };

    const handleEditExpense = (expense) => {
        setSelectedExpense(expense);
        setNewExpense({ ...expense });
    };

    return (
        <div className='bg-navy-800 h-screen flex justify-center pt-10'>
            <div className='flex flex-column justify-center'>
                <div className='rounded-lg bg-white text-center p-2 h-max px-4'>
                    <Heading title="Expenses" />
                    <SubHeading subheading="Manage your expenses" />
                    <div className='text-left px-4'>
                        <input type="text" placeholder="Description" value={newExpense.description || ''} onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })} />
                        <input type="number" placeholder="Amount" value={newExpense.amount || ''} onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} />
                        {selectedExpense ? (
                            <button onClick={handleUpdateExpense}>Update Expense</button>
                        ) : (
                            <button onClick={handleAddExpense}>Add Expense</button>
                        )}
                        <ul>
                            {expenses.map((expense) => (
                                <li key={expense.id}>
                                    <p><strong>Description:</strong> {expense.description}</p>
                                    <p><strong>Amount:</strong> {expense.amount}</p>
                                    <button onClick={() => handleEditExpense(expense)}>Edit</button>
                                    <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
