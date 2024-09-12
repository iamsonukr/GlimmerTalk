import mongoose from "mongoose";

const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
    // created at, updated
},{timestamps:true})

const messageModel=mongoose.models.messages || mongoose.model('messages',messageSchema)

export default messageModel