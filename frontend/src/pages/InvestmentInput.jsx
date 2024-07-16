import React, { useState } from 'react';
import axios from 'axios';

const InvestmentInput = () => {
    const [income, setIncome] = useState('');
    const [risk, setRisk] = useState('Low'); // Set default values for select options
    const [roi, setRoi] = useState('Low'); // Set default values for select options
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.get('http://localhost:3000/quiz/literacy-rate', {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            }); 
            if (response.status === 204) { // Assuming 204 No Content is returned if the quiz is not completed
                setMessage('Please complete the quiz first.');
                return;
            }
            const literacyRate = response.data.literacyRate;

            const investmentData = {
                income,
                risk,
                roi,
                literacyRate
            };

            await axios.post('http://localhost:3000/investment', investmentData, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });

            setMessage('Investment data saved successfully!');
        } catch (error) {
            console.error('Error saving investment data:', error);
            setMessage('Failed to save investment data.');
        }
    };

    return (
        <div>
            <h1>Investment Input</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Income:</label>
                    <input
                        type="text"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Risk Level:</label>
                    <select
                        value={risk}
                        onChange={(e) => setRisk(e.target.value)}
                        required
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div>
                    <label>Expected ROI:</label>
                    <select
                        value={roi}
                        onChange={(e) => setRoi(e.target.value)}
                        required
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default InvestmentInput;
