import React from 'react';

const StudentHeader = (props) => {
    console.log(props.student.name);
    return (
        <div className='flex justify-between items-center p-2 bg-amber-500'>
            <div>
                {props.student.name}
            </div>
            <div className='flex space-x-4'>
                <div>
                    Profile
                </div>
                <div>
                    Logout
                </div>
            </div>
        </div>
    )
}

export default StudentHeader;
