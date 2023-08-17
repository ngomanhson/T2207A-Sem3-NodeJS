const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log("Server is running...");
})

require("./src/db/database");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const webrouter = require("./src/routes/web");
app.use("/", webrouter);

const userrouter = require("./src/routes/user");
app.use("/auth", userrouter);

const productrouter = require("./src/routes/product");
app.use("/", productrouter);