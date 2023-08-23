const mongoose = require("mongoose");
const category_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
});

module.exports = mongoose.model("Category", category_schema);
