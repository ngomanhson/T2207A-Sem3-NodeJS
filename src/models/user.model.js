const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
});

module.exports = mongoose.model("User", user_schema);
