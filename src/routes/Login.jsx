import React, { useContext } from 'react'
import { useState } from 'react'
import { UserContext } from '../components/UserContextProvider'
import { useNavigate } from 'react-router-dom'
import bcrypt from "bcryptjs"

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(null)

  const userContext = useContext(UserContext)

  const navigate = useNavigate()

  function handleLogin() {
    const query = new URLSearchParams({email}).toString()
     fetch(`http://localhost:5001/users?${query}`)
        .then((r) => r.json())
        .then((users) => users[0])
        .then((user) => {
          if(user && bcrypt.compareSync(password, user.password)) {
             userContext.onChange(user)
             navigate('/')
          }
          else {
          setErrors('User/password not found')
          }
        })
   }

  function handleSignUp() {
    navigate('/signup')
  }

    return <>
    <div className='prose flex flex-col gap-7 mt-6 mx-auto'>
      <h1 className='m-0'>Login</h1>
      <div className='prose flex flex-col gap-2'>
        <input className='bg-gray-200 px-1.5' placeholder='email' onChange={(e) => setEmail(e.target.value)}/>
        <input className='bg-gray-200 px-1.5' placeholder='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <button className='bg-gray-200 font-semibold  w-1/3 mx-auto' onClick={handleLogin}>Login</button>
      <button className='bg-gray-200 font-semibold  w-1/3 mx-auto' onClick={handleSignUp}>Sign Up</button>
      {errors && <div className='text-red-400'>{errors}</div>}
    </div>
  </>
}