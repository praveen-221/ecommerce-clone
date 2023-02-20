const createCategorylist = (categories, options = []) => {
    for(let c of categories) {
        options.push({
            value: c._id,
            name: c.name,
            parentId: c.parentId,
            type: c.type
        });
        if(c.children.length > 0){
            createCategorylist(c.children, options);
        }
    }
    return options;
};

export default createCategorylist;