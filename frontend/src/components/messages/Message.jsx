import React from 'react'
import { TiMessages } from 'react-icons/ti'

const Message = () => {
  const noChatSelected = true

  return (
    <>
      {noChatSelected ? (
        <NoChatSelected />
      ) : (
        <div className='chat chat-end'>
          <div className='chat-image avatar'>
            <div className='w-10 rounded-full '>
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className={`chat-bubble text-white bg-blue-500`}>
            Hi! What is up?
          </div>
          <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">12:32</div>
        </div>
      )
      }
    </>
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