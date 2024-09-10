import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie=(userId,res)=>{
    // for generating the token we pass the userId and the secert key with the method jwt.sign(). 
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,
        httpOnly:true , //prevent XSS attacks cross-site scripting attack
        sameSite:"strict" //CSRF attacks cross site request forgery attacks
    })
}

export default generateTokenAndSetCookie