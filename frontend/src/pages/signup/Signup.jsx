import React from 'react'
import GenderCheck from './GenderCheck'

const Signup = () => {
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className='text-3xl font-semibold text-center text-gray-300'>Signup 
                <span className='text-yellow-300'> GlimerTalk</span>
            </h1>

            <form>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Full Name</span>
                    </label>
                    <input type="text" placeholder='John Doe' className='w-full input input-bordered h-10'/>
                </div>
                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Username</span>
                    </label>
                    <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10'/>
                </div>

                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Password</span>
                    </label>
                    <input type="password" placeholder='Enter password' className='w-full input input-bordered h-10'/>
                </div>

                <div>
                    <label className='label p-2'>
                        <span className='text-base label-text'>Confirm Password</span>
                    </label>
                    <input type="password" placeholder='Enter password' className='w-full input input-bordered h-10'/>
                </div>

                {/* gender checkbox */}
                <GenderCheck/>


                <a href="#" className='text-sm hover:underline hover:text-blue-600'> 
                    Already have an account? 
                </a>
            </form>
        </div>

    </div>
  )
}

export default Signup