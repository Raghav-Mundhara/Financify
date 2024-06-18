import React from 'react'
import { useNavigate } from 'react-router-dom'

function NgoHeader(props) {
    const navigate = useNavigate()
    return (
        <div className='border-b'>
            <div className='flex justify-end px-4 '>
                <div className='flex space-x-4'>
                    <button onClick={() => {
                        navigate('/requests')
                    }} className='text-md'>
                        Requests {props.count}
                    </button>
                    <div>
                        <button className='text-md'>
                            Profile
                        </button>
                    </div>
                    <div>
                        <button className='text-md'>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NgoHeader