const express = require("express");
const router = express.Router();

const controller = require("./../controllers/product.controller");

router.get("/add-product", controller.addProduct);
router.post("/add-product", controller.postAddProduct);
router.get("/list-product", controller.listProduct);

module.exports = router;
