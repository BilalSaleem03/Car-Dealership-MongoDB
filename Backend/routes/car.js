const express = require("express");
const route = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const verifyJWT = require("../middlewares/auth.js");
const isOwner = require("../middlewares/isOwner.js");
const carControllers = require("../controllers/car.js")
const multer = require("multer")
const {storage} = require("../cloudanaryConfig.js")
const upload = multer({ storage });

route.get("/category/:type" , carControllers.catagoryCar)

route.get("/:id" , carControllers.specificCar)

route.delete("/delete/:id" , isLoggedIn ,isOwner, carControllers.deleteCar)

route.post("/addCar", verifyJWT , upload.single("carImage") , carControllers.addCar);

route.post("/update/:id", isLoggedIn , isOwner , upload.single("carImage"), carControllers.updateCar);


module.exports = route;