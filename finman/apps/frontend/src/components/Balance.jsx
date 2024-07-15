import React from 'react'

export default function Balance(props) {
    return (
        <div className='flex'>
            <div className='font-bold text-lg'>
                Your Balance
            </div>
            <div className='font-semibold ml-4 text-lg'>
                Rs {props.value}
            </div>
        </div>
    )
}
