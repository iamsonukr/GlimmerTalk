import express from "express"
import { getMessages, sendMessage } from "../controllers/message.controller.js"
import { protectRoute } from "../middlewares/protectRoute.middleware.js"

const messageRouter=express.Router()

// we are sending id in parameter and token in cookie to veryfy authentication
// using that token we are extracting user data , userId etc
// after verifying user we are going to the next step of sendMessage
messageRouter.post("/send/:id",protectRoute,sendMessage)

// using this method to get the messages between the sender and reveiver
messageRouter.get("/:id",protectRoute,getMessages)


export default messageRouter