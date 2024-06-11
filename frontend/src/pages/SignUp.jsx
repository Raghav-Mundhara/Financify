import React, { useState } from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import ButtonWarning from '../components/ButtonWarning';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function SignUp() {
    const [fName,setFName]=useState("");
    const [lName,setLName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    return (
        <div className='bg-slate-300 h-screen flex justify-center pt-10'>
            <div className='flex flex-column justify-center'>
                <div className='rounded-lg bg-white text-center p-2 h-max px-4'>
                    <Heading title="SignUp" />
                    <SubHeading subheading="Enter your information to create an account" />
                    <InputBox type="text" placeholder="John" label="First Name" onChange={
                        (e)=>{
                            setFName(e.target.value)
                        }
                    } />
                    <InputBox type="text" placeholder="Doe" label="Last Name" onChange={
                        (e)=>{
                            setLName(e.target.value)
                        }
                    }/>
                    <InputBox type="text" placeholder="John@gmail.com" label="Email" onChange={
                        (e)=>{
                            setEmail(e.target.value)
                        }
                    }/>
                    <InputBox type="password" placeholder="" label="Password" onChange={
                        (e)=>{
                            setPassword(e.target.value)
                        }
                    }/>
                    <Button label="SignUp" onClick={
                        async ()=>{
                            try {
                                const body={
                                    username:email,
                                    firstName:fName,
                                    lastName:lName,
                                    password:password
                                }
                                const response=await axios.post("http://localhost:3000/api/v1/user/signup",body,{
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Content-Length':body.length
                                    }
                                });
                                localStorage.setItem("token",response.data.token);
                            } catch (error) {
                                alert(error.message)
                            }
                            // navigate("/dashboard");

                        }
                    } />
                    <ButtonWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>
        </div>
    )
}
