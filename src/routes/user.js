const express = require("express");
const router = express.Router();

const controller = require("./../controllers/user.controller");

router.get("/login", controller.login);
router.post("/login", controller.postLogin);

router.get("/register", controller.register);
router.post("/register", controller.postRegister);

module.exports = router;
