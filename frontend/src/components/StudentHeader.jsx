import React from 'react';

const StudentHeader = (props) => {
    return (
        <div className='flex justify-between items-center p-2 bg-amber-500'>
            <div>
                {props.student.name}
            </div>
            <div className='flex space-x-4'>
                <div>
                    Profile
                </div>
                <div onClick={()=>{
                    localStorage.removeItem("token");
                    window.location.href='/';
                }}>
                    Logout
                </div>
            </div>
        </div>
    )
}

export default StudentHeader;
