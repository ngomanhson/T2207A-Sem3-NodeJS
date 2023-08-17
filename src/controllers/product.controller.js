const Product = require("./../models/product.model");

exports.addProduct = (req, res) => {
    res.render("add-product");
}

exports.postAddProduct = (req, res) => {
    const data = req.body;
    const p = new Product(data);
    p.save().then(() => {
        res.send("Done");
    }).catch(err => {
        res.send(err);
    })
}