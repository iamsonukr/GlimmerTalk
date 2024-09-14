import React from 'react'
import { useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

const useLogout = () => {
    const [loading,setLoading]=useState(false)

    const {setAuthUser }=useContext(AuthContext)

    const logout=async()=>{
        setLoading(true)
        try {
            const res=await fetch('http://localhost:5001/api/auth/logout',{
                method:"POST",
                headers:{"Content-Type":"application/json"}
            })
            const data=await res.json()
            if(data.error){
                throw new Error(data.error)
            }
            localStorage.removeItem("chat-user")
            setAuthUser(null)
        } catch (error) {
            
        }finally{
            setLoading(false)
        }
    }

    return {loading , logout}
}

export default useLogout