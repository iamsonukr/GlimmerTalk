import userModel from "../models/user.model"
import userModel from "../models/user.model"


const getUsersForSidebar=async(req,res)=>{
    try {
        const loggedInUserId=req.user._id
        const filterdUsers=await userModel.find({_id:{$ne:loggedInUserId}}).select("-password")
        res.status(200).json(filterdUsers)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}