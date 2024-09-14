import conversationModel from './../models/conversation.model.js'
import messageModel from '../models/message.model.js'

const sendMessage=async(req,res)=>{
    try {

        //1> user is decoded from the token in the protectedMiddleware 
        const senderId=req.user._id
        
        //receiverId is already in the params
        const {id:receiverId}=req.params
        console.log("this is seerver",senderId,receiverId   )

        // message is coming from the req.body
        const {message}=req.body
    
        //2> cheking if the conversation between these two ids already exist 
        // $all is use to check the folling elements must present in the doc no matter in which order
        let conversation=await conversationModel.findOne({
            participants:{$all:[senderId,receiverId]}
        })
        
        //3> -------Creating Conversation------------
        // if no conversation exist then creating new conversation with these two ids
        if(!conversation){
            conversation=await conversationModel.create({
                participants:[senderId,receiverId],
            })
        }
        
        // 4> -----------Creating Message----------
        // creating new message with values extracted
        const newMessage=new messageModel({
            senderId,
            receiverId,
            message
        })

        // 5> pushing the _id of a newMessage object created in previous step into the message array of a conversation
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        // await conversation.save()
        // await newMessage.save()

        // SOCKET IO FUNCTIONALITY WILL GO HERE


        //6> this will save the both conversation in 
        await Promise.all([conversation.save(), newMessage.save()])
        res.status(201).json(newMessage);
               
    } catch (error) {
        console.log({error:error})
        res.status(500).json({error:"Internal server error"})
    }
    
}

const getMessages=async(req,res)=>{
    try {
        // this way we can alias any asset coming in the req
        const {id:userToChatId}=req.params
        const senderId=req.user._id

        const conversation=await conversationModel.findOne({
            participants:{$all:[senderId,userToChatId]}
        }).populate("messages")
        // .populate is used to fill the ref in the model with the enitired data that should be on its place. it replaces the ref:user user 
        // with he exact user
        res.status(200).json(conversation.messages)
    } catch (error) {
        console.log({error:error})
        res.status(500).json({error:"Internal server error"})
    }
}

export {sendMessage,getMessages}