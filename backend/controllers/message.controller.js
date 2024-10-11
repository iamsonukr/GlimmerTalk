import conversationModel from './../models/conversation.model.js';
import messageModel from '../models/message.model.js';
import { getReceiverSocketId } from '../socket/socket.js';

const sendMessage = async (req, res) => {
    try {
        // 1. Get senderId from decoded token in protectedMiddleware
        const senderId = req.user._id;

        // Get receiverId from params
        const { id: receiverId } = req.params;

        // Get message from the request body
        const { message } = req.body;

        // 2. Check if conversation exists between sender and receiver
        let conversation = await conversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        // 3. If no conversation exists, create a new one
        if (!conversation) {
            conversation = await conversationModel.create({
                participants: [senderId, receiverId],
            });
        }

        // 4. Create new message document
        const newMessage = new messageModel({
            senderId,
            receiverId,
            message
        });

        // 5. Add message reference to conversation
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        // 6. Save both conversation and message
        await Promise.all([conversation.save(), newMessage.save()]);

        // Respond with the new message
        res.status(201).json(newMessage);

        // SOCKET.IO FUNCTIONALITY
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // Emit new message to the receiver via their socket
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

    } catch (error) {
        console.error('Error in sendMessage:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getMessages = async (req, res) => {
    try {
        // Get the other user's ID and the sender ID
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        // Find the conversation between sender and userToChatId
        const conversation = await conversationModel.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate('messages');

        // Respond with the messages
        res.status(200).json(conversation?.messages || []);

    } catch (error) {
        console.error('Error in getMessages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export { sendMessage, getMessages };
