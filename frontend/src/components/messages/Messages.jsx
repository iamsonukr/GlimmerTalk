import React from 'react'
import Message from './Message'
import MessageSkeleton from '../skeletons/MessageSkeleton';
import useGetMessages from '../../hooks/useGetMessages';

const Messages = () => {
  const {messages,loading}=useGetMessages();
  console.log(messages)

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {loading && [...Array(3)].map((_,idx)=><MessageSkeleton key={idx}/>)}
        {/* <Message/>   */}
       {!loading && messages.length===0 && (
        <p className='text-center'>Send a message to start conversation</p>
       )}
         
    </div>
  )
}

export default Messages