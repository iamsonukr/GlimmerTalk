import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    console.log("generateTokenAndSetCookie")
    // Generate the token with userId and secret key
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    // Set the JWT as a cookie
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
        httpOnly: true,  // Prevent XSS attacks
        sameSite: process.env.NODE_ENV === 'production' ? "strict" : "lax",  // Use 'lax' for development, 'strict' for production
        secure: process.env.NODE_ENV === 'production',  // Only use secure cookies in production
    });
};

export default generateTokenAndSetCookie;
