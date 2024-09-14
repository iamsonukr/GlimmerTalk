import express from "express"
import { protectRoute } from "../middlewares/protectRoute.middleware.js"
import { getUsersForSidebar } from "../controllers/user.controller.js"


const userRouter=express.Router()

userRouter.get('/',getUsersForSidebar)


export default userRouter 


