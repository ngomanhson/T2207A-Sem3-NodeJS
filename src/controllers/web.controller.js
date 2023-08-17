exports.home = (req, res) => {
    // res.send("Hello T2007A");

    var className = "T2207A";

    var students = [
        "Ngô Mạnh Sơn",
        "Phùng Văn Vũ",
        "Trịnh Văn Trung",
        "Chu Đức Hoàng",
        "Hà Hữu Hoàng"
    ];

    res.render("home", {
        className: className,
        students: students
    });
}

exports.about = (req, res) => {
    res.render("about")
}

exports.login = (req, res) => {
    res.render("login")
}

exports.register = (req, res) => {
    res.render("register")
}
