import React, { useEffect, useState } from 'react';
import Heading from '../components/Heading';
import SubHeading from '../components/SubHeading';
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import ButtonWarning from '../components/ButtonWarning';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function SignUp() {
    const [name,setName]=useState("");
    const [age,setAge]=useState(18);
    const [income,setIncome]=useState(0);
    const [address,setAddress]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    const [ngos,setNgos]=useState([]);
    const [selectedNgo,setSelectedNgo]=useState("");

    useEffect(()=>{
        const getNgos=async()=>{
            try {
                const response=await axios.get("http://localhost:3000/utils/ngos");
                setNgos(response.data);
            } catch (error) {
                alert(error);
            }
        }
        getNgos();
    },[])
    return (
        <div className='bg-slate-300 h-screen flex justify-center pt-10'>
            <div className='flex flex-column justify-center'>
                <div className='rounded-lg bg-white text-center p-2 h-max px-4'>
                    <Heading title="SignUp" />
                    <SubHeading subheading="Enter your information to create an account" />
                    <InputBox type="text" placeholder="John Doe" label="Name" onChange={
                        (e)=>{
                            setName(e.target.value)
                        }
                    } />
                    <InputBox type="text" placeholder="18" label="Age" onChange={
                        (e)=>{
                            setAge(e.target.value)
                        }
                    }/>
                    <InputBox type="text" placeholder="0" label="Income" onChange={
                        (e)=>{
                            setIncome(e.target.value)
                        }
                    }/>
                    <InputBox type="text" placeholder="123, Main Street, New York" label="Address" onChange={
                        (e)=>{
                            setAddress(e.target.value)
                        }
                    }/>
                    <InputBox type="text" placeholder="John@gmail.com" label="Email" onChange={
                        (e)=>{
                            setEmail(e.target.value)
                        }
                    }/>
                    <InputBox type="password" placeholder="******" label="Password" onChange={
                        (e)=>{
                            setPassword(e.target.value)
                        }
                    }/>
                    <select onChange={(e)=>{
                        setSelectedNgo(e.target.value);
                    }
                    }>
                        <option value="">Select NGO</option>
                        {ngos.map((ngo,index)=>{
                            return <option key={index} value={ngo._id}>{ngo.name}</option>
                        })}
                    </select>
                    <Button label="SignUp" onClick={
                        async ()=>{
                            try {
                                console.log(selectedNgo);
                                const body={
                                    email:email,
                                    name:name,
                                    age:Number(age),
                                    password:password,
                                    income:Number(income),
                                    address:address,
                                    ngoId:selectedNgo
                                }
                                const response=await axios.post("http://localhost:3000/student/register",body,{
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Content-Length':body.length
                                    }
                                });
                                alert("Registered Successfully");
                                localStorage.setItem("token",response.data.token);
                            } catch (error) {
                                alert(error.response.data.msg)
                            }
                            

                        }
                    } />
                    <ButtonWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin-student"} />
                </div>
            </div>
        </div>
    )
}
