const express = require("express");
const route = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn.js")
const employeeontrollers = require("../controllers/employee.js")
const multer = require("multer")
const {storage} = require("../cloudanaryConfig.js")
const upload = multer({ storage });

route.get("/" , employeeontrollers.allEmployees)

route.get("/:id" , employeeontrollers.specificEmployee)

route.post("/addemployee", isLoggedIn , upload.single("employeeImage"), employeeontrollers.addEmployee);

route.post("/update/:id", isLoggedIn ,upload.single("employeeImage") ,  employeeontrollers.updateEmployee);


module.exports = route;