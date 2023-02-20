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
            type: i.type,
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
        return res.status(400).json(error);
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
        return res.status(400).json(error);
    }
};

const updateCategories = async (req, res) => {
    const { _id, name, parentId, type } = req.body;
    const updatedCategories = [];

    if(name instanceof Array){  // for updation of more than on category
        for(let i = 0; i < name.length; i++) {
            const category = {
                name: name[i],
                type: type[i]
            };
            if(parentId[i] !== ""){
                category.parentId = parentId[i]
            }

            // findOneAndUpdate returns old doc before update if new parameter is not set to true
            const updatedCategory = await Category.findOneAndUpdate({_id: _id[i]}, category, {new: true});
            updatedCategories.push(updatedCategory);
        }
        return res.status(200).json({ updatedCategories });
    } else {    // for updation of single category
        const category = {
            name,
            type
        };
        if(parentId !== ""){
            category.parentId = parentId
        }

        const updatedCategory = await Category.findOneAndUpdate({_id}, category, {new: true});
        return res.status(200).json({ updatedCategory });
    }
};

const deleteCategories = async (req, res) => {
    const { ids } = req.body.payload;
    const deletedCategories = [];

    for(let i = 0; i < ids.length; i++) {
        const deleteCategory = await Category.findOneAndDelete({_id: ids[i]._id});
        deletedCategories.push(deleteCategory);
    }
    // checking if every selected categories deleted
    if(deletedCategories.length === ids.length) {
        return res.status(200).json({ message: "Categories removed successfully" });
    }
    return res.status(400).json({ message: "Something went wrong ;(" });
}

module.exports = { createCategory, getCategories, updateCategories, deleteCategories };