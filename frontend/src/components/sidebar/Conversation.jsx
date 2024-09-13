import React from 'react'
import ConversationCard from './ConversationCard'

const Conversation = () => {
  return (
    <div className='py-2 flex flex-col overflow-auto'>
        <ConversationCard/>
        <ConversationCard/>
        <ConversationCard/>
        <ConversationCard/>

    </div>
  )
}

export default Conversation