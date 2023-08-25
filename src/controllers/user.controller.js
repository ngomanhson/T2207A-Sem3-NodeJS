const User = require("./../models/user.model");
const bcrypt = require("bcryptjs");

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
        res.send("Login success");
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
        data.password = hashed;
        const u = new User(data);
        await u.save();
        res.send("Success");
    } catch (err) {
        res.send(err);
    }
};
