import React from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import useConversation from '../../zustand/useConversation';
import { TiMessages } from 'react-icons/ti'; // Make sure to import the icon

const MessageContainer = () => {
  const { selectedConversation } = useConversation(); // Destructured `setSelectedConversation` was unused
  
  console.log("this is", selectedConversation);

  return (
    <>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div className="md:min-w-[450px] flex flex-col">
          {/* Header */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To: </span>
            <span className="label-text">{selectedConversation.fullName || ''}</span>
          </div>

          {/* Messages */}
          <Messages />

          {/* Message Input */}
          <MessageInput />
        </div>
      )}
    </>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full px-10">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome John Doe *</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl" />
      </div>
    </div>
  );
};
