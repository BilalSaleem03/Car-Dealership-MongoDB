const express = require("express");
const route = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn.js");
const isowner = require("../middlewares/isOwner.js");
const saleController = require("../controllers/sale.js")

route.post("/:id", isLoggedIn , isowner ,saleController.sale);


module.exports = route;