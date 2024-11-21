import React, { useContext } from 'react';
import { TiMessages } from 'react-icons/ti';
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';
import { AuthContext } from '../../context/AuthContext';

const Message = ({ message }) => {
  const { selectedConversation } = useConversation();
  const { authUser } = useContext(AuthContext);

  const fromMe = String(message.senderId) === String(authUser.user._id);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.user.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? 'bg-blue-500' : '';
  const formattedTime = extractTime(message.createdAt);
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img 
            src={profilePic || '/default-avatar.png'} 
            alt="Profile" 
          />
        </div>
      </div>
      <div className={`chat-bubble ${bubbleBgColor} ${shakeClass}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;