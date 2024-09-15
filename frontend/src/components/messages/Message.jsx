import React from 'react'
import { TiMessages } from 'react-icons/ti'
import useConversation from '../../zustand/useConversation'
import useGetMessages from '../../hooks/useGetMessages'
import { extractTime } from '../../utils/extractTime'
import {AuthContext} from '../../context/AuthContext'
import { useContext } from 'react'


const Message = ({message}) => {

  const {selectedConversation}=useConversation()
  const {authUser}=useContext(AuthContext)
  const fromMe = message.senderId===authUser._id;
  const chatClassName=fromMe?'chat-end':'chat-start';

  const profilePic = fromMe? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor=fromMe ? 'bg-blue-500':'';

  const formatedTime=extractTime(message.createdAt)

  const shakeClass=message.shouldShake?"shake" :" "

   
  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full '>
          <img
            alt="Tailwind CSS chat bubble component"
            src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${shakeClass} ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 pb-1 items-center">{formatedTime}</div>
    </div>
  )
}

export default Message

const NoChatSelected = () => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className=' px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome John Doe *</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  )
}