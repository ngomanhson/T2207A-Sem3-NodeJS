const express = require("express");
const router = express.Router();

const controller = require("../controllers/user.controller");

// ===== Middleware ===== //
// All routes
// router.use((req, res, next) => {
//     const auth = req.session.auth;
//     if (auth) {
//         // Logged in
//         return res.redirect("/");
//     }
//     next();
// });

router.use((req, res, next) => {
    const auth = req.session.auth;
    if (auth) {
        // Logged in
        if (req.originalUrl === "/auth/change-password") {
            return next();
        }
        return res.redirect("/");
    }
    next();
});

// Only register
router.use("/register", (req, res, next) => {
    // res.send("Time " + Date.now());
    next();
});

router.get("/login", controller.login);
router.post("/login", controller.postLogin);

router.get("/register", controller.register);
router.post("/register", controller.postRegister);

router.get("/change-password", controller.changePassword);
router.post("/change-password", controller.postPassword);

module.exports = router;
