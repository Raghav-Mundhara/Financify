import React from 'react'

export default function Heading(props) {
  return (
    <div className='font-bold text-4xl pt-6'>
        {props.title}
    </div>
  )
}
