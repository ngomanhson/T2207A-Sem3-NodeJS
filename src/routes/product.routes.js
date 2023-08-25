const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const middleware = require("./../middlewares/role.middleware");
router.use("/create", middleware.role_admin);
router.use("/edit/:id", middleware.role_admin);
router.use("/delete/:id", middleware.role_admin);

// Upload file
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/uploads");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "_" + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.get("/", controller.list);

router.get("/create", controller.formCreate);
router.post("/create", upload.single("image"), controller.store);

router.get("/edit/:id", controller.formEdit);
router.post("/edit/:id", upload.single("image"), controller.update);

router.get("/delete/:id", controller.delete);
module.exports = router;
