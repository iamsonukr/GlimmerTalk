import React, { useEffect, useRef } from 'react'
import Message from './Message'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import useGetMessages from '../../hooks/useGetMessages'
import useListenMessages from '../../hooks/useListenMessages'

const Messages = () => {
  const { messages, loading } = useGetMessages()
  useListenMessages()
  
  const lastMessageRef = useRef(null)

  useEffect(() => {
    // Scroll to the last message immediately when messages change
    if (messages.length > 0) {
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ 
          behavior: "smooth", 
          block: "nearest" 
        });
      }, 100); // Reduced delay for better UX
    }
  }, [messages]);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading && messages.length > 0 && messages.map((message, index) => (
        <div 
          key={message._id} 
          ref={index === messages.length - 1 ? lastMessageRef : null}
        >
          <Message message={message} />
        </div>
      ))}

      {loading && [...Array(3)].map((_, idx) => (
        <MessageSkeleton key={idx} />
      ))}

      {!loading && messages.length === 0 && (
        <p className='text-center text-gray-500'>
          Send a message to start conversation
        </p>
      )}
    </div>
  )
}

export default Messages