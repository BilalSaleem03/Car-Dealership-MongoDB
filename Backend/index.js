const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
// const multer = require("multer")
// const upload = multer({dest : "/CustomerImages"})

const flash = require('connect-flash');


//Routes Calling
const exploreRoute = require("./routes/explore.js")
const carRoute = require("./routes/car.js")
const employeeRoute = require("./routes/employee.js")
const customerRoute = require("./routes/customer.js")
const saleRoute = require("./routes/sale.js")
const historyRoute = require("./routes/history.js")
const authenticateRoute = require("./routes/authenticate.js")
const personalPostsRoute = require("./routes/personalPosts.js")
 

//middleware
app.use(express.urlencoded({ extended: true }));         
app.use(bodyParser.json());
app.use(cookieParser()); 
app.use((req, res, next) => {
    // console.log("req", req.cookies);
    next();
});


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

//connection with mongooDB
async function Main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Car_Dealership");
}
Main().then(()=>{console.log("Database connected")}).catch((err)=>{console.log(err)});


//Routes
app.use("/explore" , exploreRoute);
app.use("/car" , carRoute);
app.use("/aboutus" , employeeRoute);
app.use("/customer" , customerRoute);
app.use("/addsales" , saleRoute);
app.use("/history" , historyRoute);
app.use("/authenticate" , authenticateRoute);
app.use("/personalPosts" , personalPostsRoute);



app.listen(3000 , ()=>{
    console.log("Server running on port 3000")
})