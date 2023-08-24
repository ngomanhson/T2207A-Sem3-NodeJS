const Product = require("./../models/product.model");
const Category = require("./../models/category.model");
const Brand = require("./../models/brand.model");
const fs = require("fs"); //Filesystem

exports.list = async (req, res) => {
    try {
        const product = await Product.find().populate("category").populate("brand").exec();
        res.render("product/list", {
            product: product,
        });
    } catch (error) {
        res.send(error);
    }
};

exports.formCreate = async (req, res) => {
    const data = req.body;
    const category = await Category.find();
    const brand = await Brand.find();
    data.url = req._parsedOriginalUrl.path;
    res.render("product/form", { product: data, category: category, brand: brand });
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
        // data.image = uploads/${file.filename};
        const p = new Product(data);
        await p.save();
        res.redirect("/product");
    } catch (error) {
        res.send("product/form", { products: data, error: error });
    }
};

exports.formEdit = async (req, res) => {
    const _id = req.params.id;
    try {
        const category = await Category.find();
        const brand = await Brand.find();
        const product = await Product.findById(_id).populate("category").populate("brand").exec();
        product.url = req._parsedOriginalUrl.path;
        res.render("product/form", { product: product, category: category, brand: brand });
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
