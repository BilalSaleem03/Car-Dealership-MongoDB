const express = require("express");
const route = express.Router();

const personalPostController = require("../controllers/personalPosts.js")

route.get("/" ,personalPostController.personalPosts)

module.exports = route;