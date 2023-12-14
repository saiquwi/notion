import React from 'react';
import { Link } from 'react-router-dom';

export default function Page404() {
    return (
        <div className='w-4/5 h-3/5 mx-5 my-auto px-2/5 py-0 flex flex-col gap-2 mt-20 justify-center'>
            <span className='align-center text-2xl font-bold'>404</span>
            <span className='align-center text-3xl font-bold'>
                Page not found
            </span>
            <span className='align-center text-2xl text-gray-400'>
                Go <Link to={`/`} className='underline'>Home</Link>
            </span>
        </div>
    )
}