import { categoryConstants } from "../actions/constants";

const initState = {
    categories: [],
    loading: false,
    error: null
};

const addNewCategory = (pid, categories, category) => {
    let myCategoryList = [];

    if(pid === undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: []
            }
        ];
    }

    for(let c of categories) {
        if(c._id === pid){
            myCategoryList.push({
                ...c,
                children: c.children ? addNewCategory(pid, [...c.children, {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children
                }], category) : []
            });
        }
        else {
            myCategoryList.push({
                ...c,
                children: c.children ? addNewCategory(pid, c.children, category) : []
            });
        }
    }

    return myCategoryList;
}

export default (state = initState, action) => {
    switch(action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories,
                loading: false
            }
            break;
        case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
            state = {
                ...initState,
                error: action.payload.error
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const parentId = action.payload.category.parentId;
            state = {
                ...state,
                categories: addNewCategory(parentId, state.categories, action.payload.category),
                loading: false,
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...initState
            }
            break;
    }
    return state;
}