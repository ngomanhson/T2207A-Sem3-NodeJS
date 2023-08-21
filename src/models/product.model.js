const mongoose = require("mongoose");

const product_schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "This field is required to enter"],
        minLength: 10,
        maxLength: 255,
    },
    price: {
        type: Number,
        required: [true, "This field is required to enter"],
        minLength: 0,
    },
    description: {
        type: String,
    },
    image: {
        data: String,
        contentType: String,
    },
});

module.exports = mongoose.model("Product", product_schema);
