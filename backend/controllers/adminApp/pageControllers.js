const Page = require("../../models/pageSchema");

const createPage = (req, res) => {
    const { bannerImages, products } = req.files;

    if(bannerImages.length > 0) {
        req.body.bannerImages = bannerImages.map((banner, index) => ({
            img: `${process.env.API}public/${banner.filename}`,
            navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }));
    }
    if(products.length > 0) {
        req.body.products = products.map((product, index) => ({
            img: `${process.env.API}public/${product.filename}`,
            navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`
        }));
    }
    req.body.createdBy = req.user._id;

    const newPage = new Page(req.body);
    newPage.save((error, page) => {
        if(error) return res.status(400).json({ error });
        if(page) {
            return res.status(200).json({ page });
        }
    })
};

module.exports = { createPage };