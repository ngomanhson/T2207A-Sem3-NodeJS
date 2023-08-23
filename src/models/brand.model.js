const mongoose = require("mongoose");
const brand_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
});

module.exports = mongoose.model("Brand", brand_schema);
