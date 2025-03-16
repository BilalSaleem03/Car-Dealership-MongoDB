
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
// const passportLocalMongoose = require('passport-local-mongoose');




const userSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase : true,
        trim : true,
        required: true,
        unique: true,
        index : true
    },
    email: {
        type: String,
        required: true,
        lowercase : true,
        trim : true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    refreshToken:{
        type : String,
    }

});

// userSchema.plugin(passportLocalMongoose);


//mongoose pluggin to encrypt password before saving it to database
userSchema.pre("save" , async function(next){
    if(!this.isModified("password")) return next();
    try{
        this.password =await bcrypt.hash(this.password , 10);
        next();
    } catch(error){
        next(error)
    }
})

//adding additional method(custom) to check the password is correct or not
userSchema.methods.isPasswordCorrect = async function(userSentPassword){
    return await bcrypt.compare(userSentPassword , this.password);
}

//adding a function in userschema to generate Access token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            username : this.username,
            email : this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIERY
        }
    )
}


//adding a function in userschema to generate Refresh token
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIERY
        }
    )
}

module.exports = mongoose.model('User', userSchema);