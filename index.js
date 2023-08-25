const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log("Server is running...");
});

// Config session
const session = require("express-session");
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: "T2207A-NodeJS",
        cookie: {
            maxAge: 3600000, // Miliseconds
            secure: false,
        },
    })
);

require("./src/db/database");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const webrouter = require("./src/routes/web.routes");
app.use("/", webrouter);

const userrouter = require("./src/routes/user.routes");
app.use("/auth", userrouter);

const productrouter = require("./src/routes/product.routes");
app.use("/product", productrouter);

const categoryrouter = require("./src/routes/category.routes");
app.use("/category", categoryrouter);

const brandrouter = require("./src/routes/brand.routes");
app.use("/brand", brandrouter);
