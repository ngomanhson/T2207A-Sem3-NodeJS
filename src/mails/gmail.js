const nodemailer = require("nodemailer");
const config = {
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: "sonnmth2205010@fpt.edu.vn",
        pass: "tdartnylbtpbdtmj",
    },
};
const transport = nodemailer.createTransport(config);
module.exports = transport;
