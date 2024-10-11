import React, { useEffect } from 'react';
import {useSocketContext} from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import notification from '../assets/sounds/notification.mp3';

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notification);
      sound.play();
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket?.on('newMessage', handleNewMessage);

    return () => socket?.off('newMessage', handleNewMessage);
  }, [socket, setMessages]);

  return null;
};

export default useListenMessages;
