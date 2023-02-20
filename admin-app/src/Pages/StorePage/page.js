import React, { useEffect, useState } from 'react';
import { Row, Col, Container, FormLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { createPage } from '../../actions';
import FormInput from '../../components/FormInput';
import FormModal from '../../components/FormModal';
import Layout from '../../components/Layout/layout';
import createCategoryList from '../../helpers/categoryList';

function StorePage() {
    const category = useSelector(state => state.Categories);
    const page = useSelector(state => state.pages);
    const dispatch = useDispatch();
    const [createModal, setCreateModal] = useState(false);

    const [title, setTitle] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [desc, setDesc] = useState("");
    const [type, setType] = useState("");
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        setCategories(createCategoryList(category.categories));
    }, [category]);

    useEffect(() => {
        console.log(page);
        if(!page.loading) {
            setCreateModal(false);
            setTitle("");
            setCategoryId("");
            setDesc("");
            setType("");
            setBanners([]);
            setProducts([]);
        }
    },[page]);

    const handleBannerImage = (e) => {
        setBanners([...banners, e.target.files[0]]);
    }

    const handleProductImage = (e) => {
        setProducts([...products, e.target.files[0]]);
    }

    const onCategoryChange = (e) => {
        const category = categories.find(c => e.target.value === c._id);
        setCategoryId(e.target.value);
        setType(category.type);
    }

    const submitPageForm = () => {
        const form = new FormData();

        if(title === ""){
            alert("Title is required");
            setCreateModal(false);
            return;
        } 

        form.append('title', title);
        form.append('description', desc);
        form.append('category', categoryId);
        form.append('type', type);
        banners.forEach((banner) => {
            form.append("bannerImages", banner);
        });
        products.forEach((product) => {
            form.append("products", product);
        });

        console.log({ categoryId });
        dispatch(createPage(form));
        setCreateModal(false);
    }

    const showCreateModal = () => {
        return (
					<FormModal
						show={createModal}
						modalTitle={"Create New Page"}
						handleClose={() => setCreateModal(false)}
						modalButton={"Create"}
						size="md"
                        onSubmit={submitPageForm}
					>
						<Container>
                            <Row>
                                <Col>
                                    <FormLabel>Select Category</FormLabel>
                                    <select
                                        className="form-control form-control-sm"
                                        value={categoryId}
                                        onChange={onCategoryChange}
                                    >
                                        <option value={""}>select one</option>
                                        {categories.map((option) => {
                                            return (
                                                <option key={option.value} value={option.value}>
                                                    {option.name}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {/* <FormInput 
                                        type = "select"
                                        placeholder = {"select one"}
                                        value = {categoryId}
                                        onChange = {onCategoryChange}
                                        options = {categories}
                                    /> */}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormInput
                                        className="form-control-sm"
                                        label="Page Title"
                                        placeholder="Enter Title"
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormInput
                                        className="form-control-sm"
                                        label="Page Description"
                                        placeholder="Enter Desciption"
                                        type="text"
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <FormLabel>Banner Images</FormLabel>
                                <br></br>
                                {
                                    banners.length > 0 ?
                                    banners.map((banner, index) => {
                                        return(
                                            <div>
                                                <Row key={index}>
                                                    <Col>{banner.name}</Col>
                                                </Row>
                                            </div>
                                        )
                                    }) : null
                                }
                                <input
                                    type="file"
                                    name="bannerImages"
                                    onChange={handleBannerImage}
                                />
                            </Row>
                            <Row>
                                <FormLabel>Product Images</FormLabel>
                                <br></br>
                                {
                                    products.length > 0 ?
                                    products.map((product, index) => {
                                        return (
                                            <div>
                                                <Row key={index}>
                                                    <Col>{product.name}</Col>
                                                </Row>
                                            </div>
                                        )
                                    }) : null
                                }
                                <input
                                    type="file"
                                    name="products"
                                    onChange={handleProductImage}
                                />
                            </Row>
                        </Container>
					</FormModal>
				);
    }

    return (
        <>
            <Layout sidebar>
                {
                    page.loading ? 
                    <p>Create Page</p>
                    :
                    <>
                        {showCreateModal()}
                        <button onClick={() => setCreateModal(true)}>Create page</button>
                    </>
                }
            </Layout>
        </>
    );
}

export default StorePage;