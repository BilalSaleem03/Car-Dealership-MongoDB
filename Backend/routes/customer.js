const express = require("express");
const route = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn.js")
const customerController = require("../controllers/customer.js")
const multer = require("multer")

const {storage} = require("../cloudanaryConfig.js")
const upload = multer({ storage });


route.get("/" , customerController.allCustomers)

route.get("/:id" ,customerController.specificCustomer)

route.post("/addcustomer", isLoggedIn, upload.single("customerImage") , customerController.addCustomer );


route.post("/update/:id", isLoggedIn , upload.single("customerImage") , customerController.updateCustomer);


module.exports = route;