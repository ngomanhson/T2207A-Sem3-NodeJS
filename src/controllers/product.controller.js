const Product = require("./../models/product.model");
const Category = require("./../models/category.model");
const fs = require("fs"); //Filesystem

exports.list = async (req, res) => {
    try {
        const rs = await Product.find().populate("category").exec();
        res.render("product/list", { products: rs });
    } catch (error) {
        res.send(error);
    }
};

exports.formCreate = (req, res) => {
    const data = req.body;
    data.url = req._parsedOriginalUrl.path;
    res.render("product/form", { product: data });
};

exports.store = async (req, res) => {
    const data = req.body;
    const file = req.file;
    // console.log(file);

    if (file) {
        const img = fs.readFileSync(file.path);
        data.image = {
            contentType: file.mimetype,
            data: img.toString("base64"),
        };
    }

    try {
        // data.image = `uploads/${file.filename}`;
        const p = new Product(data);
        await p.save();
        res.redirect("/product");
    } catch (error) {
        res.send("product/form", { product: data, error: error });
    }
};

exports.formEdit = async (req, res) => {
    const _id = req.params.id;
    try {
        const product = await Product.findById(_id).populate("category").exec();
        // product.url = req._parsedOriginalUrl.path;
        product.image = "";

        res.send(product);
        res.render("product/form", { product: product });
    } catch (error) {
        res.redirect("/product");
    }
};

exports.update = async (req, res) => {
    const _id = req.params.id;
    const data = req.body;
    const product = await Product.findById(_id);
    try {
        const file = req.file;
        if (file) {
            const img = fs.readFileSync(file.path);
            data.image = {
                contentType: file.mimetype,
                data: img.toString("base64"),
            };
        } else {
            data.image = product.image;
        }
        await Product.findByIdAndUpdate(_id, data);
        res.redirect("/product");
    } catch (error) {
        res.render("product/form", { product: product });
    }
};

exports.delete = async (req, res) => {
    const _id = req.params.id;
    try {
        await Product.findByIdAndDelete(_id);
        res.redirect("/product");
    } catch (error) {
        res.redirect("/product");
    }
};
