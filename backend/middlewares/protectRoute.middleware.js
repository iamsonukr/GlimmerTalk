import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'

const protectRoute = async (req, res, next) => {
    try {
        // EXTRACTING TOKEN
        const token = req.cookies.jwt;
        if (!token) return res.status(401).json({ error: "Unauthorized - No Token Provided" });

        // VERIFYING AND EXTRACTING USERID TOKEN
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded?.userId).select("-password");

        // CHECKING IF USER EXIST
        if (!user) return res.status(404).json({ error: "User not found" });

        // ASSIGNING REQ.USER TO THE VALUE OF USER FOUND IN DATABASE
        req.user = user;

        // GOING TO THE SEND MESSAGE FUNCTION OF THE ROUTER
        next();
    } catch (error) {
        console.error("Protected middleware error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


export {protectRoute}