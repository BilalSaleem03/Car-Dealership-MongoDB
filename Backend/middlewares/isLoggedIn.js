

module.exports = function isLoggedIn (req , res , next){
    if(!req.cookies.accessToken){
        return res.status(401).json({ error: "You are not logged in" });
    }

    next();
}