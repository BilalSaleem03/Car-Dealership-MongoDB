const express = require("express");
const route = express.Router();
const exploreController = require("../controllers/explore.js")

route.get("/" , exploreController.explore)


module.exports = route;