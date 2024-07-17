import React, { useState } from 'react';
import axios from 'axios';

const InvestmentInput = () => {
    const [income, setIncome] = useState('');
    const [risk, setRisk] = useState('Low'); 
    const [roi, setRoi] = useState('Low'); 
    const [message, setMessage] = useState('');
    const [prediction, setPrediction] = useState(''); 

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const quizResponse = await axios.get('http://localhost:3000/quiz/literacy-rate', {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            }); 
            if (quizResponse.status === 204) {
                setMessage('Please complete the quiz first.');
                return;
            }
            const literacyRate = quizResponse.data.literacyRate;
    
            const investmentData = {
                income,
                risk,
                roi,
                literacyRate
            };
    
            const investmentResponse = await axios.post('http://127.0.0.1:5000/predict', investmentData, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });
    
            if (investmentResponse.data.prediction) {
                setPrediction(investmentResponse.data.prediction);
                setMessage('Investment data saved successfully!');
            } else {
                setMessage('Investment data saved successfully, but failed to get a prediction.');
            }
        } catch (error) {
            console.error('Error saving investment data:', error);
            setMessage(`Failed to save investment data: ${error.response?.data?.error || error.message}`);
        }
    };
    
    return (
        <div className='min-h-screen bg-navy-dark flex items-center justify-center'>
            <div className='bg-white rounded-lg p-8 shadow-lg max-w-md w-full'>
                <h1 className='text-2xl font-bold mb-4'>Investment Input</h1>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div>
                        <label className='block mb-1'>Income:</label>
                        <input
                            type="text"
                            value={income}
                            onChange={(e) => setIncome(e.target.value)}
                            required
                            className='p-2 border rounded w-full'
                        />
                    </div>
                    <div>
                        <label className='block mb-1'>Risk Level:</label>
                        <select
                            value={risk}
                            onChange={(e) => setRisk(e.target.value)}
                            required
                            className='p-2 border rounded w-full'
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div>
                        <label className='block mb-1'>Expected ROI:</label>
                        <select
                            value={roi}
                            onChange={(e) => setRoi(e.target.value)}
                            required
                            className='p-2 border rounded w-full'
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className='bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 w-full'
                    >
                        Submit
                    </button>
                </form>
                {message && <p className='mt-4'>{message}</p>}
                {prediction && <p className='mt-4'>Prediction: {prediction}</p>}
            </div>
        </div>
    );
};

export default InvestmentInput;
