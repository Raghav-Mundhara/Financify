import React, { useState } from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import ButtonWarning from '../components/ButtonWarning';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function SignUpNgo() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const navigate = useNavigate();

    return (
        <div className='bg-navy-dark h-screen flex justify-center pt-10'>
            <div className='flex flex-col justify-center'>
                <div className='rounded-lg bg-white text-center p-6 h-max px-8'>
                    <Heading title="SignUp as NGO" />
                    <SubHeading subheading="Enter your information to create an account" />
                    <InputBox type="text" placeholder="NGO Name" label="Name" onChange={
                        (e) => {
                            setName(e.target.value)
                        }
                    } />
                    <InputBox type="text" placeholder="123 Street, City, Country" label="Address" onChange={
                        (e) => {
                            setAddress(e.target.value)
                        }
                    } />
                    <InputBox type="email" placeholder="ngo@example.com" label="Email" onChange={
                        (e) => {
                            setEmail(e.target.value)
                        }
                    } />
                    <InputBox type="password" placeholder="********" label="Password" onChange={
                        (e) => {
                            setPassword(e.target.value)
                        }
                    } />
                    <InputBox type="text" placeholder="1234567890" label="Contact" onChange={
                        (e) => {
                            setContact(e.target.value)
                        }
                    } />
                    <Button label="SignUp" onClick={
                        async () => {
                            try {
                                const body = {
                                    name: name,
                                    address: address,
                                    email: email,
                                    password: password,
                                    contact: contact
                                };
                                const response = await axios.post("http://localhost:3000/ngo/register", body, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                    }
                                });
                                localStorage.setItem("token", response.data.token);
                                navigate("/dashboard"); 
                            } catch (error) {
                                alert(error.message);
                            }
                        }
                    } />
                    <ButtonWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin-ngo"} />
                </div>
            </div>
        </div>
    );
}
