const mongoose = require("mongoose");
const Car = require("../models/Car.js");
const jwt = require('jsonwebtoken')


module.exports.personalPosts = async (req , res)=>{
    try{
        let accessToken = req.cookies.accessToken;
        if(!accessToken){
            return res.status(401).json({error : 'Not logged IN'})
        }
        let userInfo = jwt.verify(accessToken , process.env.ACCESS_TOKEN_SECRET);
        if(!userInfo){
            return res.status(403).json({error : 'Unauthorized Access'})
        }
        console.log(userInfo)
        // let data = await Car.find({Car_Owner : userInfo.username , Availability : true});
        let data = await Car.find({Car_Owner : userInfo.username , Availability: true });

        if(!data){
            return res.status(404).json({error : "No Data Found"})
        }
        return res.status(200).json(data);
    } catch(error){
        console.log(error);
        return res.status(500).json({error : "Server side error"})
    }
} 