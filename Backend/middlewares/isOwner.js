const Car = require("../models/Car.js");
const User = require("../models/User.js");
const jwt = require('jsonwebtoken')

module.exports = async function isOwner (req , res , next){
    try {
        // console.log("in carOwner")
        const accessToken = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer " , "");
        if(!accessToken){
            return res.status(401).json({error : 'Unauthorized Access'});
        }
        const decodedTokenInfo = jwt.verify(accessToken , process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedTokenInfo._id).select("-password -refreshToken");
    
        if(!user){
            return res.status(401).json({error : "Invalid AccessToken"})
        }
        console.log(user)
        let {id} = req.params;
        // console.log(id)
        let carOwner = await Car.findById(id , {Car_Owner : 1});
        // console.log(carOwner)
        if(user.username !== carOwner.Car_Owner){
            return res.status(403).json({error : "You are not the Owner"});
        }
        next();
    } catch (error) {
        console.log(error)
        const options = {httpOnly : true , secure: true, sameSite: "none" ,maxAge: 0};
        if(error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError'){
            return res.status(401)
            .clearCookie("accessToken" , options)
            .clearCookie("refreshToken" , options)
            .json({error : "Access Token Expired"})
        }
        
        return res.status(500).json({error : "Something went wrong"})
    }
}