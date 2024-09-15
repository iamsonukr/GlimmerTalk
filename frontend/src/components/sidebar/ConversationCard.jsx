import React from 'react'
import useConversation from '../../zustand/useConversation'

const ConversationCard = ({conversation,lastIdx,emoji}) => {
    const {selectedConversation,setSelectedConversation}= useConversation()
    const isSelected=selectedConversation?._id===conversation._id

  return (
    <>
        <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected?"bg-sky-400":""}`}
        onClick={()=>setSelectedConversation(conversation)}
        >

            {/* avatar */}
            <div className="avatar online ">
                <div className='w-12 rounded-full'>
                    <img className='w-1 h-[1px] rounded-full ' src={conversation.profilePic} alt="user avatar" />
                </div>
            </div>
            {/* name and icon */}
            <div className='flex flex-col flex-1'>
                <div className='flex gap-3 justify-between'>
                    <p className='font-bold text-gray'>{conversation.fullName}</p>
                    <span className='text-xl'>{emoji}</span>
                </div>
            </div>

        </div>

        {/* <div className='divider my-0 py-0 h-1' />  */}
        {!lastIdx && <div className='divider my-0 py-0 h-1'/>}
    </>
  )
}

export default ConversationCard