const User = require("../models/User.js");
const jwt = require('jsonwebtoken');


const generateAccessAndRefreshToken = async (userId)=>{
    try{
        let user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken(); 
        
        user.refreshToken = refreshToken;  //addd refresh token to user
        const newuser = await user.save({validateBeforeSave : false} , { returnOriginal: false });  //save modified user(refresh token added) to database
        
        return {accessToken , refreshToken};

    } catch(error){
        res.status(401).json({error : "Something went wrong"})
    }
}


module.exports.signup = async (req, res) => {
    const { username, email, password } = req.body;
    //check if fields are empty or not
    if ([username, email, password].some((field) => !field?.trim())) {
        return res.status(401).json({ error: "All fields are required" });
    }    
    try {
        const newUser = new User({ username, email , password });
        const user = await User.create(newUser);
        res.status(200).json({ success: "Signed up successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to sign up" });
    }
}

module.exports.login = async (req , res)=>{
    let accessToken = req.cookies.accessToken;
    console.log("accessToken" , accessToken)
    if(accessToken){
        return res.status(403).json({error : 'Already logged IN'})
    }
    const {username , password} = req.body;
    try{
        if(!username || !password){
            return res.status(401).json({error : "No Cradentials Provided"})
        }
        const userFromDatabase = await User.findOne({username : username});
        if(!userFromDatabase){
            return res.status(401).json({error : "Invalid Username or Password"})
        }
        const isValidPAssword = await userFromDatabase.isPasswordCorrect(password);
        if(!isValidPAssword){
            return res.status(401).json({error : "Invalid Password"})
        }

        const {accessToken , refreshToken} = await generateAccessAndRefreshToken(userFromDatabase._id);

        // const userToSendToClient = await User.findById(userFromDatabase._id).select("-password -refreshToken");
        
        //setting cookies and sening response
        const options = {httpOnly : true , secure: true, sameSite: "none" ,maxAge: 7 * 24 * 60 * 60 * 1000};   //by setting theseoptions noe cookies can't be updated from client side  but only from sever
        return res
        .status(200)
        .cookie("accessToken" , accessToken , options)
        .cookie("refreshToken" , refreshToken , options)
        .json({success : "Logged IN"});

    } catch(error){
        console.log(error);       
        res.status(500).json({error : "something went wrong"})
    }
}

module.exports.logout = async (req , res)=>{
    //clearing refreshToken from DB
    await User.findByIdAndUpdate(req.user._id , {$set : { refreshToken : undefined}});
    const options = {httpOnly : true , secure: false};
    return res 
    .status(200)
    .clearCookie("accessToken" , options)
    .clearCookie("refreshToken" , options)
    .json({success : "Logged Out"})
}

module.exports.renewAccessToken = async(req , res)=>{
    let oldRefreshToken = req.cookies?.refreshToken || req.body.refreshtoken;

    if(!oldRefreshToken){
        return res.status(401).json({error : "Unaurhorized2 Access Please Login!!"});
    }

    let decodedRefreshToken = jwt.verify(oldRefreshToken , process.env.REFRESH_TOKEN_SECRET);
    //get user 
    const user = await User.findById(decodedRefreshToken._id);
    if(!user){
        return res.status(401).json({error : "Unaurhorized Access Please Login!!"});
    }

    if(user.refreshToken !== oldRefreshToken){
        return re.status(401).json({error : "Invalid Refresh Token!!"});
    }
    //generating new Tokens
    let {accessToken , refreshToken} = await generateAccessAndRefreshToken(user._id);

    const options = {httpOnly : true , secure: true, sameSite: "none" ,maxAge: 7 * 24 * 60 * 60 * 1000};
    return res
    .status(200)
    .cookie("accessToken" , accessToken , options)
    .cookie("refreshToken" , refreshToken , options)
    .json({success : "Login session Revived"});

}

module.exports.isLoggedIn = async (req , res)=>{
    try{
        const accessToken = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer " , "");
        if(!accessToken){
            return res.status(401).json({error : 'Unauthorized Access'});
        }
        const decodedTokenInfo = jwt.verify(accessToken , process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedTokenInfo._id).select("-password -refreshToken");
        if(!user){
            return res.status(401).json({error : "Invalid AccessToken"})
        }
        return res.status(200).json({user : user.username})
    } catch(error){
        res.status(500).json({error : "something went wrong"})
    }
}