const Product = require("./../models/product.model");
const Category = require("./../models/category.model");

exports.list = async (req, res) => {
    try {
        const rs = await Category.find();
        res.render("category/list", { category: rs });
    } catch (error) {
        res.send(error);
    }
};

exports.formCreate = (req, res) => {
    const data = req.body;
    data.url = req._parsedOriginalUrl.path;
    res.render("category/form", { category: data });
};

exports.store = async (req, res) => {
    const data = req.body;

    try {
        const c = new Category(data);
        await c.save();
        res.redirect("/category");
    } catch (error) {
        res.send("category/form", { category: data, error: error });
    }
};

exports.formEdit = async (req, res) => {
    const _id = req.params.id;
    try {
        const category = await Category.findById(_id);

        res.render("category/form", { category: category });
    } catch (error) {
        res.redirect("/category");
    }
};

exports.update = async (req, res) => {
    const _id = req.params.id;
    const data = req.body;
    const category = await Category.findById(_id);
    try {
        await Category.findByIdAndUpdate(_id, data);
        res.redirect("/category");
    } catch (error) {
        res.render("category/form", { category: category });
    }
};

exports.delete = async (req, res) => {
    const _id = req.params.id;
    try {
        await Category.findByIdAndDelete(_id);
        res.redirect("/category");
    } catch (error) {
        res.redirect("/category");
    }
};
