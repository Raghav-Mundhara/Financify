import React from 'react'
import {Link} from 'react-router-dom'
export default function ButtonWarning(props) {
  return (
    <div className='py-2 text-sm flex justify-center'>
        <div>{props.label}</div>
        <Link className='pointer underline pl-1 cursor-pointer' to={props.to}>{props.buttonText}</Link>
    </div>
  )
}
