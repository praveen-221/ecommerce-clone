import React, { useState } from 'react';
import { Col, Container, Row, Button, FormLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../actions';
import FormInput from '../../components/FormInput';
import Layout from "../../components/Layout/layout";
import FormModal from '../../components/FormModal';

function Categories(props) {
    const category = useSelector(state => state.Categories);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');

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

    // create a recursive list of parent & children categories
    const renderCategories = (categoryList) => {
        let clientCategories = [];
        for(let i of categoryList) {
            clientCategories.push(
                <li key={i.name}>
                    {i.name}
                    {i.children.length > 0 ? (<ul>{renderCategories(i.children)}</ul>) : null}
                </li>
            );
        }
        return clientCategories;
    }
    
    // update the categories once request is successful without fetching form DB which requires a reload
    const createCategorylist = (categories, options = []) => {
        for(let c of categories) {
            options.push({ value: c._id, name: c.name});
            if(c.children.length > 0){
                createCategorylist(c.children, options);
            }
        }
        return options;
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <h3>Categories</h3>
                            <Button variant="primary" onClick={handleShow}>Add</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        {renderCategories(category.categories)}
                    </Col>
                </Row>
            </Container>
            <FormModal show = {show} handleClose = {handleClose} modalTitle = {"Add new Category"}>
                <FormInput
					label="Category Name"
					placeholder="Enter Name"
					type="text"
					value={categoryName}
					onChange={(e) => setCategoryName(e.target.value)}
				/>
				<FormLabel>Select Parent Category</FormLabel>
				<select
					className="form-control"
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
				<FormLabel>Category Image</FormLabel>
				<br></br>
				<input
					type="file"
					name="categoryImage"
					onChange={handleCategoryImage}
				/>
            </FormModal>
        </Layout>
    );
}

export default Categories;