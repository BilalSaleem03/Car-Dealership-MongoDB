const express = require("express");
const route = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn.js")
const customerController = require("../controllers/customer.js")
const multer = require("multer")


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/"); // Save files in 'uploads/' folder
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname); // Unique filename
//     },
// });

const {storage} = require("../cloudanaryConfig.js")
const upload = multer({ storage });


route.get("/" , customerController.allCustomers)

route.get("/:id" ,customerController.specificCustomer)

route.post("/addcustomer", isLoggedIn , customerController.addCustomer );
// route.post("/addcustomer", isLoggedIn ,(req , res , next)=>{console.log("kkkkk"); next()},  upload.single("customerImage"), (req , res)=>{
//     console.log("inside Api")
//     try {
//         console.log("Uploaded file details:", req.file); // Correct way to access uploaded file
//         res.json({
//             message: "File uploaded successfully",
//             imageUrl: req.file.path, // This is the URL of the uploaded file on Cloudinary
//         });
//     } catch (error) {
//         console.error("Upload failed:", error);
//         res.status(500).json({ error: error.message || "File upload failed" })
//     }
// } );

route.post("/update/:id", isLoggedIn , customerController.updateCustomer);


module.exports = route;