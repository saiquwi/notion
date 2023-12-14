import React, { useContext } from 'react'
import { UserContext } from '../components/UserContextProvider'
import { Link } from 'react-router-dom'

export default function Home() {
    const { user } = useContext(UserContext)
    
    return <>
        <div className='prose flex flex-col gap-7 mt-6'>
            <h1 className='m-0'>About me</h1>
            <div>
                <div><span className='font-bold'>Email:</span> {user.email}</div>
                <div><span className='font-bold'>Date sign up:</span> {new Date(user.date).toLocaleString()}</div>
            </div>
            <Link to={`/notes`} className='bg-gray-200 w-1/3 mx-auto no-underline'>Go to notes</Link>
        </div>
        </>
}