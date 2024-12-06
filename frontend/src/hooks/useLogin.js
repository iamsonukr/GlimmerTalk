import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

const useLogin = () => {

    const {authUser,setAuthUser}=useContext(AuthContext)
    const [loading,setLoading]=useState(true)



    const login=async({username,password})=>{
        setLoading(true)
        console.log(username,password)
        try {
            const res=await axios.post(`${url}/api/auth/login`,{username,password},{withCredentials:true})
            const data=res.data
    
            if(res.data.failMessage){
                toast.error(res.data.failMessage)
                return;
            }else{
                setAuthUser(res.data)
                localStorage.setItem("chat-user",JSON.stringify(data))
                toast.success("Login successfull")
            }
        } catch (error) {
            toast.error("Error client")
        }

    }


    return {login}
}

export default useLogin