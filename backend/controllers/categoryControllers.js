const Category = require("../models/categorySchema");
const slugify = require("slugify");

// get subcategory of the given category using parent id by recursive function
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

const createCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    };
    if(req.file){
        categoryObj.categoryImage = process.env.API + "public/" + req.file.filename;
    }

    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }

    try {
        const category = new Category(categoryObj);
        category.save((err, result) => {
            if(err) return res.status(400).json( err );
            if(result){
                return res.status(200).json({category});
            }
        });
    }
    catch(error){
        return res.status(404).json(error);
    }
};

const getCategories = (req, res) => {
    try{
        Category.find({})
        .exec((error, result) => {
            if(error){
                return res.status(400).json( error );
            }
            if(result){
                const categoryList = createCategories(result);
                res.status(200).json({Categories : categoryList});
            }
        });
    }
    catch(error){
        return res.status(404).json(error);
    }
};

module.exports = {createCategory, getCategories};