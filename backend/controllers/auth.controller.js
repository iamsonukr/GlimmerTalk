import bcryptjs from "bcryptjs";
import userModel from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.utils.js";



const signupController = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
           
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }
        
        // Check if user already exists
        const person = await userModel.findOne({ username });
        if (person) {
            return res.json({ error: "User already exists" });
        }
        
        // Hash password
        const salt = await bcryptjs.genSalt(10);  // Use bcryptjs to generate salt
        const hashedPassword = await bcryptjs.hash(password, salt);  // Use bcryptjs to hash password

        // Set profile picture based on gender
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;  // Corrected URL

        // Create new user
        const newUser = new userModel({
            fullName,
            username,
            gender,
            password: hashedPassword,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
        });

        // Save new user and generate token
        if (newUser) {
            await newUser.save();
            //This _id is available immediately, even before the document is saved to the database.

            // generate token
            generateTokenAndSetCookie(newUser._id, res);

            // send user detail after creating it 
            return res.status(201).json({ user: newUser,message:"User Created Successfully" });
        } else {
            return res.status(400).json({ error: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in sign up controller:", error.message);
        return res.status(500).json({ error: error.message });
    }
};



const loginController=async(req,res)=>{
    try {
        const {username,password}=req.body

        //find the user 
        const user=await userModel.findOne({username})
        // check password
        const checkPassword=await bcryptjs.compare(password,user?.password || "")

        // check both are correct 
        if(!user || !checkPassword){
            return res.status(400).json({error:"Invalid credentials"})
        }
        generateTokenAndSetCookie(user._id,res)
        res.status(200).json({"user":user})     
    } catch (error) {
        console.log(error)
        res.status(500).json({"error":"Internal Server error"})
    }

}
const logoutController=async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"})
        
    } catch (error) {
        console.log("Error in log out",error.message)
        res.status(500).json({"error":"Internal Server Error"})
    }
}

export {loginController,logoutController,signupController}