import React from 'react'
import { useNavigate } from 'react-router-dom'

function NgoHeader(props) {
    const navigate=useNavigate()
  return (
    <div className='border-b'>
        <div className='flex justify-end px-4'>
            <div onClick={()=>{
                navigate('/requests')
            }} className='text-lg font-semibold'>
                Requests {props.count}
            </div>
        </div>
    </div>
  )
}

export default NgoHeader