const Brand = require("./../models/brand.model");

exports.list = async (req, res) => {
    try {
        const rs = await Brand.find();
        res.render("brand/list", { brand: rs });
    } catch (error) {
        res.send(error);
    }
};

exports.formCreate = (req, res) => {
    const data = req.body;
    data.url = req._parsedOriginalUrl.path;
    res.render("brand/form", { brand: data });
};

exports.store = async (req, res) => {
    const data = req.body;

    try {
        const p = new Brand(data);
        await p.save();
        res.redirect("/brand");
    } catch (error) {
        res.send("brand/form", { brand: data, error: error });
    }
};

exports.formEdit = async (req, res) => {
    const _id = req.params.id;
    try {
        const brand = await Brand.findById(_id);

        // res.send(brand);
        res.render("brand/form", { brand: brand });
    } catch (error) {
        res.redirect("/brand");
    }
};

exports.update = async (req, res) => {
    const _id = req.params.id;
    const data = req.body;
    const brand = await Brand.findById(_id);
    try {
        await Brand.findByIdAndUpdate(_id, data);
        res.redirect("/brand");
    } catch (error) {
        res.render("brand/form", { brand: brand });
    }
};

exports.delete = async (req, res) => {
    const _id = req.params.id;
    try {
        await Brand.findByIdAndDelete(_id);
        res.redirect("/brand");
    } catch (error) {
        res.redirect("/brand");
    }
};
