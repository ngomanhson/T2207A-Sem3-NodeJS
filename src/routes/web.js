const express = require("express");
const router = express.Router();

const controller = require("./../controllers/web.controller");

router.get("/",controller.home)

router.get("/about",controller.about)

module.exports = router;