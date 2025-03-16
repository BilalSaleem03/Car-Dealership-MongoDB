const express = require("express");
const route = express.Router();
const historyController = require("../controllers/history.js")

route.get("/" , historyController.history )

module.exports = route;