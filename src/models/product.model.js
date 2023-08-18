const mongoose = require("mongoose");

const product_schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "This field is required to enter"],
    },
    price: {
        type: Number,
        required: [true, "This field is required to enter"],
    },
    description: {
        type: String,
        required: [true, "This field is required to enter"],
    },
    image: {
        type: String,
        required: [true, "This field is required to enter"],
    },
});

module.exports = mongoose.model("Product", product_schema);
