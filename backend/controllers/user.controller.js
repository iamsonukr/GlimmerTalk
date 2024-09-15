import userModel from "../models/user.model.js"



const getUsersForSidebar=async(req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await userModel.find({
            _id: { $ne: loggedInUserId }
        });
        res.status(200).json(filteredUsers)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Internal server error"})
    }
}

export {getUsersForSidebar}