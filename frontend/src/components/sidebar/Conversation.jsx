import React from 'react'
import ConversationCard from './ConversationCard'
import useGetConversation from '../../hooks/useGetConversation'
import { useEffect } from 'react'
import { getRandomEmoji } from '../../utils/emoji'

const Conversation = () => {
  const { loading, conversation } = useGetConversation()

  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversation.map((conversation,idx)=>(
        <ConversationCard 
        key={conversation._id}
        conversation={conversation}
        emoji={getRandomEmoji()}
        lastIdx={idx===conversation.length-1}
         />
      ))}


      {loading? <span className='loading loading-spinner'></span>:null}
    </div>
  )
}

export default Conversation