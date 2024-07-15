import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';

const Rewards = () => {
    const [rewardEligibility, setRewardEligibility] = useState(null);

    useEffect(() => {
        checkRewardEligibility();
    }, []);

    const checkRewardEligibility = async () => {
        try {
            const response = await axios.get('http://localhost:3000/student/calculate-savings', {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });
            setRewardEligibility(response.data);
        } catch (error) {
            alert(error.message);
        }
    };

    const handleClaimReward = async () => {
        try {
            const response = await axios.put('http://localhost:3000/student/add-reward', {}, {
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                }
            });
            alert(response.data.msg); // Show pop-up with reward granted message
            checkRewardEligibility(); // Re-check reward eligibility after claiming
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className='bg-navy-800 h-screen flex justify-center pt-10'>
            <div className='flex flex-column justify-center'>
                <div className='rounded-lg bg-white text-center p-2 h-max px-4'>
                    <Heading title="Rewards" />
                    <SubHeading subheading="Activate your rewards" />
                    {rewardEligibility && (
                        <div>
                            <p>Savings: {rewardEligibility.savings}</p>
                            <p>Virtual Currency: {rewardEligibility.virtualCurrency}</p>
                            {rewardEligibility.isEligibleForReward ? (
                                <button onClick={handleClaimReward}>Activate</button>
                            ) : (
                                <p>Not eligible for reward</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Rewards;
