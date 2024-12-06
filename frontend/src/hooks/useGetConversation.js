import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { SocketContext } from '../context/SocketContext';

const useGetConversation = () => {
    const [loading, setLoading] = useState(false);
    const [conversation, setConversations] = useState([]);
    const {url}=useContext(SocketContext)

    useEffect(() => {
        const getConversation = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${url}/api/users`,{withCredentials:true});
                
                setConversations(res.data); // Set the data
            } catch (error) {
                toast.error("An error occurred client-side");
            } finally {
                setLoading(false);
            }
        };
        getConversation();
    }, []);

    // Log conversation when it updates
    useEffect(() => {
        console.log("Updated conversation:", conversation);
    }, [conversation]);  // This runs whenever 'conversation' changes

    return { loading, conversation };
};

export default useGetConversation;
