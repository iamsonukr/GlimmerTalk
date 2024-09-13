import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

const useSignup = () => {
  const [loading,setLoading]=useState(false)

  const signup=async({fullName,username,password,confirmPassword,gender})=>{

    // checking the input field on the client side
    const success=handleInputErrors({fullName,username,password,confirmPassword,gender})
    if(!success){
      return -1;
    };

    setLoading(true)
    try {

      const res=await axios.post('http://localhost:5001/api/auth/signup',({fullName,username,password,confirmPassword,gender}))
      const data=res.data
      console.log(res.data)
      console.log(res.data.error)

      if(res.data.error){
        console.log(res.data.error)
        toast.error(res.data.error)
      }
      if(res.data.message){
        toast.success(res.data.message)
      }

      //localstorage
      //context

    } catch (error) {
      toast.error(error.message)
      // toast.error(error)
    }finally{
      setLoading(false)
    }
  }

  return {loading,signup}
}

export default useSignup

const handleInputErrors=({fullName,username,password,confirmPassword,gender})=>{
  if(!fullName || !username || !password || !confirmPassword || !gender){
    toast.error(" Please fill all input fields")
  }

  if(password !== confirmPassword && (password.length >0 && confirmPassword.length>0)){
    toast.error("Password do not match")
    return false
  }

  if(password.length <6 && password.length !==0){
    toast.error('Password must be at least 6 character')
    return false
  }

  return true
}

