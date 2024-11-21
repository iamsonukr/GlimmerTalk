import React, { useEffect, useState } from 'react'; 
import useConversation from '../zustand/useConversation'; 
import axios from 'axios'; 
import toast from 'react-hot-toast';

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      // Reset error state at the start of each fetch
      setError(null);
      setLoading(true);

      try {
        // Validate selectedConversation before making request
        if (!selectedConversation?._id) {
          throw new Error('No conversation selected');
        }

        const res = await axios.get(`http://localhost:5001/api/messages/${selectedConversation._id}`, { 
          withCredentials: true,
          // Add timeout to handle potential network issues
          timeout: 10000  
        });

        // Validate response data
        if (!Array.isArray(res.data)) {
          throw new Error('Invalid response format');
        }

        // Optional: Sort messages by creation time if not handled by backend
        const sortedMessages = res.data.sort((a, b) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

        setMessages(sortedMessages);
      } catch (error) {
        // Comprehensive error handling
        if (axios.isAxiosError(error)) {
          // Network or server response error
          const errorMsg = error.response?.data?.message || 
                           error.message || 
                           'Failed to fetch messages';
          
          setError(errorMsg);
          toast.error(errorMsg);
        } else if (error instanceof Error) {
          // Other JavaScript errors
          setError(error.message);
          toast.error(error.message);
        } else {
          // Fallback for unexpected errors
          const genericError = 'An unexpected error occurred';
          setError(genericError);
          toast.error(genericError);
        }
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if conversation is selected
    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  // Return loading state and potential error along with messages
  return { 
    messages, 
    loading, 
    error 
  };
};

export default useGetMessages;