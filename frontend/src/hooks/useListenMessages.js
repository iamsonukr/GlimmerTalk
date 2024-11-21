import React, { useEffect, useCallback } from 'react';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import notification from '../assets/sounds/notification.mp3';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();

  const handleNewMessage = useCallback((newMessage) => {
    try {
      // Validate the new message
      if (!newMessage || !newMessage._id) {
        console.warn('Received invalid message:', newMessage);
        return;
      }

      // Prevent duplicate messages
      const isDuplicate = messages.some(msg => msg._id === newMessage._id);
      if (isDuplicate) {
        console.log('Duplicate message prevented');
        return;
      }

      // Only add message if it belongs to the current conversation
      if (selectedConversation?._id && 
          (newMessage.senderId === selectedConversation._id || 
           newMessage.receiverId === selectedConversation._id)) {
        
        // Add shake effect and play notification
        newMessage.shouldShake = true;
        
        // Play notification sound
        try {
          const sound = new Audio(notification);
          sound.play().catch(error => {
            console.warn('Error playing notification sound:', error);
          });
        } catch (soundError) {
          console.error('Sound initialization error:', soundError);
        }

        // Update messages state
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    } catch (error) {
      console.error('Error processing new message:', error);
    }
  }, [messages, selectedConversation, setMessages]);

  useEffect(() => {
    // Ensure socket exists before adding listener
    if (!socket) {
      console.warn('Socket not initialized');
      return;
    }

    // Add message listener
    socket.on('newMessage', handleNewMessage);

    // Cleanup listener on unmount or socket change
    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket, handleNewMessage]);

  // Advanced socket connection error handling
  useEffect(() => {
    if (socket) {
      // Handle connection errors
      socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      // Handle disconnection
      socket.on('disconnect', (reason) => {
        console.warn('Socket disconnected:', reason);
      });
    }
  }, [socket]);

  return null;
};

export default useListenMessages;