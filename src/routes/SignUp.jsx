import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from '../utils/validation';
import { z } from "zod";
import  bcrypt from "bcryptjs";

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [errors, setErrors] = useState(null)

    const navigate = useNavigate()

    function handleSignUp() {
      if(password === repeatPassword) {

      try {
        const user = User.parse({
          email: email,
          password: password,
        })
        setErrors(null)
        const query = new URLSearchParams({email}).toString()
        fetch(`http://localhost:5001/users?${query}`)
        .then((r) => r.json())
        .then((users) => users[0])
        .then((user) => {
           if(user){
                const er= {others:{_errors : ['Such user already exists']}}
                setErrors(er)
            }
           else {
        const hashPwd = bcrypt.hashSync(password)
        fetch(`http://localhost:5001/users`, {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: hashPwd,
            date: Date.now()
          })
        })
        .then(() => navigate('/login'))
      }
      } )}
       catch(err) {
         if(err instanceof z.ZodError) {
            setErrors(err.format())
          }
      }
    }
      else {
        const er= {others:{_errors : ['Password mismatch']}}
        setErrors(er)
      }
     
  }

    return <>
    <div className='prose flex flex-col gap-7 mt-6 mx-auto'>
      <h1 className="m-0">Sign Up</h1>
      <div className='prose flex flex-col gap-2'>
        <input placeholder='email' className='bg-gray-200 px-1.5' onChange={(e) => setEmail(e.target.value)}/>
        {errors?.email && <div className='text-red-400'>{errors?.email?._errors}</div>}
        <input placeholder='password' type='password' value={password} className='bg-gray-200 px-1.5' onChange={(e) => setPassword(e.target.value)}/>
        <input placeholder="repeat password" type="password" value={repeatPassword} className='bg-gray-200 px-1.5' onChange={(e) => setRepeatPassword(e.target.value)}/>
        {errors?.password && <div className='text-red-400'>{errors?.password?._errors}</div>}
        </div>
      <button className='bg-gray-200 font-semibold w-1/3 mx-auto' onClick={handleSignUp}>Sign Up</button>
      {errors?.others && <div className='text-red-400'>{errors?.others?._errors}</div>}
    </div>
  </>
}

        
               