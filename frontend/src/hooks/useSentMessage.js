import React, { useState } from 'react'
import useConversation from '../zustand/useConversation';
import axios from 'axios';
import toast from 'react-hot-toast';

const useSentMessage = () => {
    const [loading,setLoading]=useState(false);
    const {messages,setMessages,selectedConversation}=useConversation();
    
    const sendMessage=async(message)=>{
        setLoading(true)
        try {
            const res = await axios.post(`http://localhost:5001/api/messages/send/${selectedConversation._id}`,{message},{withCredentials:true})
            console.log(res)
            setMessages([...messages,res.data])


        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false)
        }
    } 
    return {sendMessage,loading}
}

export default useSentMessage