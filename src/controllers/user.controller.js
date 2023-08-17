const User = require("./../models/user.model");
exports.login = (req, res) => {
    res.render("login");
}

exports.register = (req, res) => {
    res.render("register");
}

exports.postLogin = (req, res) => {
    res.send("done");
}

exports.postRegister = (req, res) => {
    const data = req.body;
    const u = new User(data);

    u.save().then(() => {
        res.send("Done");
    }).catch(err => {
        res.send(err);
    })
}