const express = require("express");
const route = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const verifyJWT = require("../middlewares/auth.js");
const isOwner = require("../middlewares/isOwner.js");
const carControllers = require("../controllers/car.js")


route.get("/category/:type" , carControllers.catagoryCar)

route.get("/:id" , carControllers.specificCar)

route.delete("/delete/:id" , isLoggedIn ,isOwner, carControllers.deleteCar)

route.post("/addCar", verifyJWT , carControllers.addCar);

route.post("/update/:id", isLoggedIn , isOwner , carControllers.updateCar);


module.exports = route;