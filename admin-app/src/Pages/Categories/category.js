import React, { useState } from 'react';
import { Col, Container, Row, FormLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckboxTree from 'react-checkbox-tree';
import {
	addCategory,
	getAllCategories,
	updateCategories,
	deleteCategories as deleteCategoriesAction
} from "../../actions";
import { 
    IoCheckboxOutline, IoCheckbox, IoBrowsersOutline, IoReorderThree, IoClose, IoAdd, IoTrash, IoCloudUploadOutline
} from "react-icons/io5";
import FormInput from '../../components/FormInput';
import Layout from "../../components/Layout/layout";
import FormModal from '../../components/FormModal';
// CSS
import "./category.css";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

function Categories(props) {
    const category = useSelector(state => state.Categories);
    const dispatch = useDispatch();
    // AddCategory Modal states
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    // checktree states
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    // Edit & delete Category Modal states
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleClose = () => {
        // create form to send request to server similar to postman Form-Data type of request since it has image
        const form = new FormData();
        // create fields and values in the form
        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        // dispatch the action to create the category
        dispatch(addCategory(form));
        
        // const item = {
        //     categoryName,
        //     parentCategoryId,
        //     categoryImage
        // }
        setCategoryName('');
        setParentCategoryId('');
        setCategoryImage('');
        setShow(false);
    };
    const handleShow = () => setShow(true);

    // updates the checked and expanded state of each category
    const categoryState = () => {
        const categories = createCategorylist(category.categories);
        const checkedArray = [];
        const expandedArray = [];

        checked.length > 0 && checked.forEach((cId, index) => {
            const category = categories.find((category, _index) => cId === category.value)
            category && checkedArray.push(category);
        });
        expanded.length > 0 && expanded.forEach((cId, index) => {
            const category = categories.find((category, _index) => cId === category.value)
            category && expandedArray.push(category);
        });
        
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    }

    const handleEditModal = () => {
        categoryState();
        setShowEditModal(true);
    }
    const handleEditInput = (key, value, index, type) => {
        if(type === "checked"){
            const newArray = checkedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setCheckedArray(newArray);
        } else if(type === "expanded"){
            const newArray = expandedArray.map((item, _index) => index === _index ? { ...item, [key]: value } : item);
            setExpandedArray(newArray);
        }
    }

    const handleDeleteModal = () => {
        categoryState();
        setShowDeleteModal(true);
    }

    // create a recursive list of parent & children categories
    const renderCategories = (categoryList) => {
        let clientCategories = [];
        for(let category of categoryList) {
            clientCategories.push(
                // <li key={i.name}>
                //     {i.name}
                //     {i.children.length > 0 ? (<ul>{renderCategories(i.children)}</ul>) : null}
                // </li>
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
            );
        }
        return clientCategories;
    }
    
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
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    const updatedCategoriesSave = () => {
        const form = new FormData();
        expandedArray.forEach((item, index) => {
            form.append("_id", item.value);
            form.append("name", item.name);
            form.append("parentId", item.parentId ? item.parentId : "");
            form.append("type", item.type); 
        });
        checkedArray.forEach((item, index) => {
            form.append("_id", item.value);
            form.append("name", item.name);
            form.append("parentId", item.parentId ? item.parentId : "");
            form.append("type", item.type); 
        });
        dispatch(updateCategories(form));

        setShowEditModal(false);
    }

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({_id: item.value}));
        // const expandedIdsArray = expandedArray.map((item, index) => ({_id: item.value}));
        // const idsArray = expandedIdsArray.concat(checkedIdsArray);
        
        if(checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray));
        }
        setShowDeleteModal(false);
    }

    // Modals
    const addCategoryModal = () => {
        return(
            <>
                {/* Add Category Modal */}
				<FormModal
					show={show}
					handleClose={() => setShow(false)}
					modalTitle={"Add new Category"}
                    modalButton={"Submit"}
                    onSubmit={handleClose}
				>
                    <Row>
                        <Col>
                        <FormInput
                            className="form-control-sm"
                            label="Category Name"
                            placeholder="Enter Name"
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                        </Col>
                        <Col>
                            <FormLabel>Select Parent Category</FormLabel>
                            <select
                                className="form-control form-control-sm"
                                value={parentCategoryId}
                                onChange={(e) => setParentCategoryId(e.target.value)}
                            >
                                <option value={""}>select one</option>
                                {createCategorylist(category.categories).map((option) => {
                                    return (
                                        <option key={option.name} value={option.value}>
                                            {option.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <FormLabel>Category Image</FormLabel>
                        <br></br>
                        <input
                            type="file"
                            name="categoryImage"
                            onChange={handleCategoryImage}
                        />
                    </Row>
				</FormModal>
            </>
        );
    }
    const updateCategoriesModal = () => {
        return(
            <>
            {/* Edit Category Modal */}
				<FormModal
					show={showEditModal}
					handleClose={() => setShowEditModal(false)}
					modalTitle={"Edit Categories"}
                    modalButton={"Save"}
                    onSubmit={updatedCategoriesSave}
					size="lg"
				>
					<Row>
						<Col>
							<h6>Expanded Categories</h6>
						</Col>
					</Row>
                    {
                        expandedArray.length > 0 &&
                        expandedArray.map((item, index) => {
                            return(
                                <Row key={index}>
                                    <Col>
                                        <FormInput
                                            placeholder="Enter Name"
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => handleEditInput("name", e.target.value, index, "expanded")}
                                        />
                                    </Col>
                                    <Col>
                                        <select
                                            className="form-control"
                                            value={item.parentId}
                                            onChange={(e) => handleEditInput("parentId", e.target.value, index, "expanded")}
                                        >
                                            <option value={""}>Select Parent Category</option>
                                            {createCategorylist(category.categories).map((option) => {
                                                return (
                                                    <option key={option.name} value={option.value}>
                                                        {option.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </Col>
                                    <Col>
                                        <select 
                                            className="form-control" 
                                            value={item.type}
                                            onChange={(e) => handleEditInput("type", e.target.value, index, "expanded")}
                                        >
                                            <option value="">Select Type</option>
                                            <option value="store">Store</option>
                                            <option value="page">Page</option>
                                            <option value="product">Product</option>
                                        </select>
                                    </Col>
                                </Row>
                            )
                        })
                    }
					{/* <FormLabel>Category Image</FormLabel>
					<br></br>
					<input
						type="file"
						name="categoryImage"
						onChange={handleCategoryImage}
					/> */}
                    <Row>
						<Col>
							<h6>Checked Categories</h6>
						</Col>
					</Row>
                    {
                        checkedArray.length > 0 &&
                        checkedArray.map((item, index) => {
                            return(
                                <Row key={index}>
                                    <Col>
                                        <FormInput
                                            placeholder="Enter Name"
                                            type="text"
                                            value={item.name}
                                            onChange={(e) => handleEditInput("name", e.target.value, index, "checked")}
                                        />
                                    </Col>
                                    <Col>
                                        <select
                                            className="form-control"
                                            value={item.parentId}
                                            onChange={(e) => handleEditInput("parentId", e.target.value, index, "checked")}
                                        >
                                            <option value={""}>Select Parent Category</option>
                                            {createCategorylist(category.categories).map((option) => {
                                                return (
                                                    <option key={option.name} value={option.value}>
                                                        {option.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </Col>
                                    <Col>
                                        <select 
                                            className="form-control" 
                                            value={item.type}
                                            onChange={(e) => handleEditInput("type", e.target.value, index, "checked")}
                                        >
                                            <option value="">Select Type</option>
                                            <option value="store">Store</option>
                                            <option value="page">Page</option>
                                            <option value="product">Product</option>
                                        </select>
                                    </Col>
                                </Row>
                            )
                        })
                    }
				</FormModal>
            </>
        );
    }
    const deleteCategoryModal = () => {
        return (
			<FormModal
				modalTitle={"Delete Categories"}
				show={showDeleteModal}
				handleClose={() => setShowDeleteModal(false)}
                buttons = {[
                    {
                        label: "No",
                        color: "primary",
                        onClick: () => {
                            alert("no");
                        }
                    },
                    {
                        label: "Yes",
                        color: "danger",
                        onClick: deleteCategories
                    }
                ]}
			>
                {/* <h6>Expanded</h6>
                {
                    expandedArray.map((item, index) => <span key={index}>{item.name}&nbsp;&nbsp;</span>)
                } */}
                <h6>Checked Categories</h6>
                {
                    checkedArray.map((item, index) => <span key={index}>{item.name}&nbsp;&nbsp;</span>)
                }
			</FormModal>
		);
    }

    return (
			<Layout sidebar>
				<Container>
					<Row>
						<Col md={12}>
							<div style={{ display: "flex", justifyContent: "space-between" }}>
								<h3>Categories</h3>
								<div className="actionBtnContainer">
									{/* <span>Actions: </span> */}
									<button onClick={handleShow}>
                                        <IoAdd />
										<span>Add</span>
									</button>
									<button onClick={handleEditModal}>
                                        <IoCloudUploadOutline />
										<span>Edit</span>
									</button>
									<button onClick={handleDeleteModal}>
                                        <IoTrash />
										<span>Delete</span>
									</button>
								</div>
							</div>
						</Col>
					</Row>
					<Row>
						<Col md={12}>{/* {renderCategories(category.categories)} */}</Col>
						<CheckboxTree
							nodes={renderCategories(category.categories)}
							checked={checked}
							expanded={expanded}
							onCheck={(checked) => setChecked(checked)}
							onExpand={(expanded) => setExpanded(expanded)}
							icons={{
								check: <IoCheckbox />,
								uncheck: <IoCheckboxOutline />,
								halfCheck: <IoBrowsersOutline />,
								expandClose: <IoReorderThree />,
								expandOpen: <IoClose />,
							}}
						/>
					</Row>
				</Container>
				{addCategoryModal()}
				{updateCategoriesModal()}
				{deleteCategoryModal()}
			</Layout>
		);
}

export default Categories;