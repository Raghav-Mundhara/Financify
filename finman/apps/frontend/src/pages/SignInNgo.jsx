import React, { useState } from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import ButtonWarning from '../components/ButtonWarning';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignInNgo() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    return (
        <div className='bg-navy-dark h-screen flex justify-center pt-10'>
            <div className='flex flex-column justify-center'>
                <div className='rounded-lg bg-white text-center p-2 h-max px-4'>
                    <Heading title="SignIn" />
                    <SubHeading subheading="Enter your credentials to access your account" />
                    <InputBox label="Email" type="text" placeholder="example@gmail.com" onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                    <InputBox label="Password" type="password" placeholder="" onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                    <Button label="Sign In" onClick={
                        async () => {
                            try {
                                const body = {
                                    email,
                                    password
                                };
                                const response = await axios.post("http://localhost:3000/ngo/signin", body, {
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                });
                                if (response.data.token) {
                                    localStorage.setItem("token", response.data.token);
                                    navigate('/ngoDashboard');
                                } else {
                                    alert(response.data.msg);
                                }
                            } catch (error) {
                                alert(error);
                            }
                        }
                    } />
                    <ButtonWarning label="Don't have an account?" buttonText="Sign Up" to="/signup-ngo" />
                </div>
            </div>
        </div>
    )
}
