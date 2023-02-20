const Category = require("../../models/categorySchema");
const Product = require("../../models/productSchema");

function createCategories(list, parentId = null){
    const categoryList = [];
    let group;
    if(parentId == null){
        group = list.filter(item => item.parentId == undefined);
    } else {
        group = list.filter(item => item.parentId == parentId);
    }

    for(let i of group){
        categoryList.push({
            _id: i._id,
            name: i.name,
            slug: i.slug,
            parentId: i.parentId,
            children: createCategories(list, i._id)
        });
    }

    return categoryList;
}

const getAdminData = async (req, res) => {
    const categories = await Category.find({}).exec();
    const products = await Product.find({})
    .select("_id name price quantity description slug productImages category")
    .populate({ path: "category", select: "_id name" })
    .exec();

    res.status(200).json({
        categories: createCategories(categories),
        products
    });
}

module.exports = { getAdminData };