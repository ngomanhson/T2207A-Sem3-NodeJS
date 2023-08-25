const User = require("./../models/user.model");
const bcrypt = require("bcryptjs");
const gmail = require("./../mails/gmail");

exports.login = (req, res) => {
    res.render("login");
};

exports.postLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const u = await User.findOne({ email: email }); // User.find({email:email});
        if (u == null) {
            res.send("Email or Password is not correct");
            return;
        }

        const verify = await bcrypt.compare(req.body.password, u.password);
        if (!verify) {
            res.send("Email or Password is not correct");
            return;
        }

        req.session.auth = {
            fullname: u.fullname,
            email: u.email,
            role: u.role,
        };
        res.redirect("/");
    } catch (err) {
        res.send(err);
    }
};

exports.register = (req, res) => {
    res.render("register");
};

exports.postRegister = async (req, res) => {
    try {
        const data = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(data.password, salt);

        // bcrypt.compare
        data.password = hashed;
        const u = new User(data);
        await u.save();

        // Send email
        gmail.sendMail({
            from: "Register success!",
            to: u.email,
            cc: "",
            bcc: "",
            subject: "Welcome",
            html: "<h1>Welcome to website.</h1>",
        });

        res.send("Success");
    } catch (err) {
        res.send(err);
    }
};

exports.changePassword = (req, res) => {
    res.render("change-password");
};

exports.postPassword = async (req, res) => {
    try {
        const loggedInUser = req.session.auth;
        const { password } = req.body;

        if (!password) {
            return res.send("Please enter a new password.");
        }

        const hashedNewPassword = await bcrypt.hash(password, 10);
        const updatedUser = await User.findOneAndUpdate({
            email: loggedInUser.email,
            password: hashedNewPassword,
            new: true,
        });

        if (!updatedUser) {
            return res.send("Password update failed.");
        }

        // Send email
        gmail.sendMail({
            from: "Change password success!",
            to: loggedInUser.email,
            cc: "",
            bcc: "",
            subject: "Notice that the account has been changed password.",
            html: "<h1>Your account has been successfully changed password.</h1>",
        });

        res.send("Change password successfully.");
    } catch (error) {
        res.send(error);
    }
};
