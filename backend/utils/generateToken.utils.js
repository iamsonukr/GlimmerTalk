import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    console.log("generateTokenAndSetCookie");

    // Ensure the JWT_SECRET is available
    const secret = process.env.JWT_SECRET || "defaultsecretkey";

    // Generate the token with userId and secret key
    const token = jwt.sign({ userId }, secret, {
        expiresIn: '15d'  // Token expiration
    });

    // Set the JWT as a cookie
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,  // 15 days in milliseconds
        httpOnly: true,  // Prevent XSS attacks
        sameSite: process.env.NODE_ENV === 'production' ? "strict" : "lax",  // Lax for development, strict for production
        secure: process.env.NODE_ENV === 'production',  // Secure cookies only in production
    });
};

export default generateTokenAndSetCookie;
