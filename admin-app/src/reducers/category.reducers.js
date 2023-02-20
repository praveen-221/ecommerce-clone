import { categoryConstants } from "../actions/constants";

const initState = {
    categories: [],
    loading: false,
    error: null
};

// update the categories once request is successful without fetching form DB which requires a reload 
// but requires recursive call
const addNewCategory = (pid, categories, category) => {
    let myCategoryList = [];

    if(pid === undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                type: category.type,
                children: []
            }
        ];
    }

    for(let c of categories) {
        if(c._id === pid){
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                type: category.type,
                children: []
            };
            myCategoryList.push({
                ...c,
                children: c.children ? [...c.children, newCategory] : [newCategory]
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
    switch (action.type) {
			case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
				state = {
					...state,
					loading: true,
				};
				break;
			case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
				state = {
					...state,
					categories: action.payload.categories,
					loading: false,
				};
				break;
			case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
				state = {
					...initState,
					loading: false,
					error: action.payload.error,
				};
				break;
			case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
				state = {
					...state,
					loading: true,
				};
				break;
			case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
				const parentId = action.payload.category.parentId;
				state = {
					...state,
					categories: addNewCategory(
						parentId,
						state.categories,
						action.payload.category
					),
					loading: false,
				};
				break;
			case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
				state = {
					...initState,
					loading: false,
					error: action.payload.error
				};
				break;
			case categoryConstants.UPDATE_CATEGORIES_REQUEST:
				state = {
					...state,
					loading: true
				};
				break;
			case categoryConstants.UPDATE_CATEGORIES_SUCCESS:
				state = {
					...state,
					loading: false
				};
				break;
			case categoryConstants.UPDATE_CATEGORIES_FAILURE:
				state = {
					...state,
                    loading: false,
					error: action.payload.error
				};
				break;
			case categoryConstants.DELETE_CATEGORIES_REQUEST:
				state = {
					...state,
					loading: true
				};
				break;
			case categoryConstants.DELETE_CATEGORIES_SUCCESS:
				state = {
					...state,
					loading: false
				};
				break;
			case categoryConstants.DELETE_CATEGORIES_FAILURE:
				state = {
					...state,
                    loading: false,
					error: action.payload.error
				};
				break;
		}
    return state;
}