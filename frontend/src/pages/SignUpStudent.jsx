import React, { useState } from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import ButtonWarning from '../components/ButtonWarning';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function SignUpStudent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [income, setIncome] = useState("");
    const [address, setAddress] = useState("");
    const navigate = useNavigate();

    return (
        <div className='bg-navy-dark h-screen flex justify-center pt-10'>
            <div className='flex flex-col justify-center'>
                <div className='rounded-lg bg-white text-center p-6 h-max px-8'>
                    <Heading title="SignUp" />
                    <SubHeading subheading="Enter your information to create an account" />
                    <InputBox type="text" placeholder="John Doe" label="Name" onChange={
                        (e) => {
                            setName(e.target.value)
                        }
                    } />
                    <InputBox type="email" placeholder="john.doe@example.com" label="Email" onChange={
                        (e) => {
                            setEmail(e.target.value)
                        }
                    } />
                    <InputBox type="password" placeholder="********" label="Password" onChange={
                        (e) => {
                            setPassword(e.target.value)
                        }
                    } />
                    <InputBox type="number" placeholder="20" label="Age" onChange={
                        (e) => {
                            setAge(e.target.value)
                        }
                    } />
                    <InputBox type="number" placeholder="50000" label="Income" onChange={
                        (e) => {
                            setIncome(e.target.value)
                        }
                    } />
                    <InputBox type="text" placeholder="123 Street, City, Country" label="Address" onChange={
                        (e) => {
                            setAddress(e.target.value)
                        }
                    } />
                    <Button label="SignUp" onClick={
                        async () => {
                            try {
                                const body = {
                                    name: name,
                                    email: email,
                                    password: password,
                                    age: parseInt(age),
                                    income: parseFloat(income),
                                    address: address
                                };
                                const response = await axios.post("http://localhost:3000/student/register", body, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                    }
                                });
                                localStorage.setItem("token", response.data.token);
                                navigate("/student-dashboard");
                            } catch (error) {
                                alert(error.message);
                            }
                        }
                    } />
                    <ButtonWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin-student"} />
                </div>
            </div>
        </div>
    );
}
