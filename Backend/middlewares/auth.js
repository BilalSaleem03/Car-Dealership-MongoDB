const User= require('../models/User');

const jwt = require('jsonwebtoken')

const verifyJWT = async (req , res , next)=>{
    try {
        const accessToken = req.cookies.accessToken;
        if(!accessToken){
            return res.status(401).json({error : 'Unauthorized Access'});
        }
        // console.log("befor decode" , accessToken)
        const decodedTokenInfo = jwt.verify(accessToken , process.env.ACCESS_TOKEN_SECRET);
        // console.log(decodedTokenInfo)
        const user = await User.findById(decodedTokenInfo._id).select("-password -refreshToken");
    
        if(!user){
            return res.status(401).json({error : "Invalid AccessToken"})
        }
        req.user = user;
        next();
    } catch (error) {
        const options = {httpOnly : true , secure: true, sameSite: "none" ,maxAge: 0};
        // console.log("error in verifyJWT middleware" , error.name);
        if(error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError'){
            return res.status(401)
            .clearCookie("accessToken" , options)
            .clearCookie("refreshToken" , options)
            .json({error : "Access Token Expired"})
        }
        return res.status(500).json({error : "Something went wrong"})
    }
}

module.exports = verifyJWT;