import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useGetConversation = () => {
    const [loading, setLoading] = useState(false);
    const [conversation, setConversations] = useState([]);

    useEffect(() => {
        const getConversation = async () => {
            setLoading(true);
            try {
                const res = await axios.get('http://localhost:5001/api/users');
                
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
