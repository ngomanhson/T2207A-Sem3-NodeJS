const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "This field is required to enter"],
        minLength: [10, "This field must be at least 10 characters"],
    },
    email: {
        type: String,
        required: true,
        minLength: 10,
        unique: true,
        validate: {
            validator: (v) => {
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return v.match(re);
            },
        },
        message: (t) => `${t.message} Incorrect email format`,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("User", user_schema);
