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
                selectedOption: selectedOption
            });
            if (response.data.isCorrect) {
                totalPoints += response.data.points; 
            }
        }

        setScore(totalPoints);
        setLiteracyRate(determineLiteracyRate(totalPoints));
    };

    return (
        <div>
            <h1>Quiz</h1>
            <form onSubmit={handleSubmit}>
                {questions.map(question => (
                    <div key={question._id}>
                        <h3>{question.question}</h3>
                        {question.options.map(option => (
                            <div key={option}>
                                <label>
                                    <input
                                        type="radio"
                                        name={question._id}
                                        value={option}
                                        onChange={() => handleOptionChange(question._id, option)}
                                    />
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
            {score !== null && (
                <div>
                    <h2>Your Score: {score}</h2>
                    <h3>Literacy Rate: {literacyRate}</h3>
                </div>
            )}
        </div>
    );
};

export default Quiz;
