import React, { useEffect, useState } from 'react';
import useConversation from '../zustand/useConversation';
import axios from 'axios';
import toast from 'react-hot-toast';

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`http://localhost:5001/api/messages/${selectedConversation._id}`, { withCredentials: true });
                setMessages(res.data);
            } catch (error) {
                toast.error(error.response?.data?.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        if (selectedConversation?._id) {
            getMessages();
        }
    }, [selectedConversation?._id, setMessages]);  // Correct placement of dependency array

    return { messages, loading };
};

export default useGetMessages;
