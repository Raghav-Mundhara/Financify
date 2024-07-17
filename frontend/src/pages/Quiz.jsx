import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [literacyRate, setLiteracyRate] = useState('');

    // Fetch the questions when the component mounts
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:3000/quiz/questions');
                setQuestions(response.data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();
    }, []);

    // Handle option selection
    const handleOptionChange = (questionId, selectedOption) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: selectedOption
        }));
    };

    // Determine literacy rate based on score
    const determineLiteracyRate = (points) => {
        if (points > 8) {
            return 'high';
        } else if (points > 4 && points <= 8) {
            return 'medium';
        } else {
            return 'low';
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        let totalPoints = 0;

        for (const question of questions) {
            const selectedOption = answers[question._id];
            const response = await axios.post('http://localhost:3000/quiz/answer', {
                questionId: question._id,
                selectedOption
            },{
                headers: {
                    Authorization: `${localStorage.getItem('token')}`
                }
            });
            if (response.data.isCorrect) {
                totalPoints += response.data.points; 
            }
        }

        setScore(totalPoints);
        setLiteracyRate(determineLiteracyRate(totalPoints));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
            <div className="bg-white max-w-2xl w-full p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">Quiz</h1>
                <form onSubmit={handleSubmit}>
                    {questions.map(question => (
                        <div key={question._id} className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">{question.question}</h3>
                            {question.options.map(option => (
                                <div key={option} className="mb-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name={question._id}
                                            value={option}
                                            onChange={() => handleOptionChange(question._id, option)}
                                            className="mr-2"
                                        />
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                {score !== null && (
                    <div className="mt-6 text-center">
                        <h2 className="text-2xl font-bold">Your Score: {score}</h2>
                        <h3 className="text-xl">Literacy Rate: {literacyRate}</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;
