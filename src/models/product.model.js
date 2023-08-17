const mongoose = require("mongoose");

const product_schema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    image: String
});

module.exports = mongoose.model("Product", product_schema);