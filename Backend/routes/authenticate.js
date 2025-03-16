const express = require('express');
const route = express.Router();
const  verifyJWT  = require('../middlewares/auth.js');


const authenticateController = require("../controllers/authenticate.js")


route.post("/signup", authenticateController.signup);


route.post("/login" ,authenticateController.login)

route.post("/logout" , verifyJWT, authenticateController.logout)

route.post("/renewAccessToken" , authenticateController.renewAccessToken)

route.post("/is-logged-in" , authenticateController.isLoggedIn)


module.exports = route;