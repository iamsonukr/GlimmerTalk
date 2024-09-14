import React, { useEffect, useState } from 'react'
import GenderCheck from './GenderCheck'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup'

const Signup = () => {

    // define variables
    const [input,setInputs]=useState({
        fullName:'',
        username:'',
        password:'',
        confirmPassword:'',
        gender:'',
    })
    // importing custom hooks
    const {loading, signup}=useSignup()

    // onChange functions
    const onChangeHandler=(e)=>{
        e.preventDefault();
        let name=e.target.name;
        let value=e.target.value;
        setInputs({...input,[name]:value})
    }

    // form submit function
    const handleSubmit=async(e)=>{
        e.preventDefault()
        await signup(input)

    }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className='text-3xl font-semibold text-center text-gray-300'>Signup 
                <span className='text-yellow-300'> GlimerTalk</span>
            </h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Full Name</span>
                    </label>
                    <input type="text" placeholder='John Doe'  name='fullName' onChange={onChangeHandler} className='w-full input input-bordered h-10'/>
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input type="text" placeholder='Enter username' name='username' onChange={onChangeHandler} className='w-full input input-bordered h-10'/>
                </div>

                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input type="password" placeholder='Enter password' name='password' onChange={onChangeHandler} className='w-full input input-bordered h-10'/>
                </div>

                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text' >Confirm Password</span>
                    </label>
                    <input type="password" placeholder='Enter password' name='confirmPassword' onChange={onChangeHandler} className='w-full input input-bordered h-10'/>
                </div>

                {/* gender checkbox */}
                <GenderCheck onChangeHandler={onChangeHandler} />


                <Link to="http://localhost:3003/login" className='text-sm hover:underline hover:text-blue-600'> 
                    Already have an account? 
                </Link>
                <button className='btn btn-block btn-sm mt-2 border border-slate-700' disabled={loading}>
                    {loading?<span className='loading loading-infinity'></span>:"Sign Up"}
                </button>
            </form>
        </div>

    </div>
  )
}

export default Signup