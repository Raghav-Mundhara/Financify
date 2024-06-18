import react, { useState } from 'react';
import axios from 'axios';
export default function NGORequests(){
    const [requests,setRequests]=useState([]);

    const getRequests=async()=>{
        const token=localStorage.getItem('token');
        const config={
            headers:{
                authorization:`${token}`,
            },
        }
        try {
            const {data}=await axios.get('http://localhost:3000/ngo/getRequest',config);
            setRequests(data);
        } catch (error) {
            alert("Error:",error)
        }
    }


    useState(()=>{
        getRequests();
    },[])
    console.log(requests);
    return <div>
        <h1>NGO Requests</h1>
        <div>
            {/* {requests.map((request,index)=>{
                return <div key={index}>
                    <h3>{request.name}</h3>
                    <p>{request.email}</p>
                    <p>{request.phone}</p>
                    <p>{request.age}</p>
                    </div>
            }
            )} */}
            {/* {requests} */}
        </div>
    </div>
}