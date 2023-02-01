const Product = require("../models/productSchema");
const Category = require("../models/categorySchema");
const { default: slugify } = require("slugify");

const addProduct = (req, res) => {
    // return res.status(200).json({file: req.files, body: req.body});
    const { name, price, description, category, quantity, createdBy } = req.body;
    let productImages = [];

    if(req.files.length > 0){
        productImages = req.files.map(file => {
            return { img: file.filename };
        });
    }

    const newproduct = new Product({
        name: name,
        slug: slugify(name),
        price,
        description,
        productImages,
        quantity,
        category,
        createdBy: req.user._id,
    });
    newproduct.save((error, result) => {
        if(error){
            return res.status(400).json({ message: error });
        }
        if(result){
            return res.status(200).json({ product: result });
        }
    });
};

const getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug })
    .exec((error, category) => {
        if(error){
            return res.status(404).json({ error });
        }
        if(category){
            Product.find({ category: category._id })
            .exec((error, products) => {
                if(error){
                    return res.status(404).json({ error });
                }
                res.status(200).json({
                    products,
                    productsByPrice: {
                        under5k: products.filter(product => product.price <= 5000),
                        under10k: products.filter(product => product.price > 5000 && product.price <= 10000),
                        under20k: products.filter(product => product.price > 10000 && product.price <= 20000),
                        under30k: products.filter(product => product.price > 20000 && product.price <= 30000),
                        under40k: products.filter(product => product.price > 30000 && product.price <= 40000),
                        under50k: products.filter(product => product.price > 40000 && product.price <= 50000),
                        under60k: products.filter(product => product.price > 50000 && product.price <= 60000),
                        above60k: products.filter(product => product.price > 60000)
                    }
                });
            })
        }
    })
};

module.exports = { addProduct, getProductsBySlug };