const express = require("express");
const route = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn.js")
const employeeontrollers = require("../controllers/employee.js")

route.get("/" , employeeontrollers.allEmployees)

route.get("/:id" , employeeontrollers.specificEmployee)

route.post("/addemployee", isLoggedIn , employeeontrollers.addEmployee);

route.post("/update/:id", isLoggedIn ,  employeeontrollers.updateEmployee);


module.exports = route;