import React, { useState } from 'react';
import "./products.css";
import Layout from '../../components/Layout/layout';
import { Col, Container, Row, Button, FormLabel, Table } from 'react-bootstrap';
import FormInput from '../../components/FormInput';
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from '../../actions';
import FormModal from '../../components/FormModal';
import { generatePublicUrl } from '../../helpers/urlConfig';

function Products(props) {
	const product = useSelector(state=> state.products);
	const category = useSelector(state => state.Categories);
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [showProductModal, setShowProductModal] = useState(false);
	const [productDetails, setProductDetails] = useState(null);

	const [name, setName] = useState('');
	const [quantity, setQuantity] = useState('');
	const [price, setPrice] = useState('');
	const [description, setDiscription] = useState('');
	const [categoryId, setCategoryId] = useState('');
	const [productImages, setProductImages] = useState([]);

    const createCategorylist = (categories, options = []) => {
		for (let c of categories) {
			options.push({ value: c._id, name: c.name });
			if (c.children.length > 0) {
				createCategorylist(c.children, options);
			}
		}
		return options;
	};

  	const handleClose = () => {
		const form = new FormData();
		form.append('name', name);
		form.append('quantity', quantity);
		form.append('price', price);
		form.append('description', description);
		form.append('category', categoryId);
		
		for(let pic of productImages){
			form.append('productImages', pic);
		}

		dispatch(addProduct(form));

		setName('');
		setQuantity('');
		setPrice('');
		setDiscription('');
		setCategoryId('');
		setProductImages([]);
		setShow(false);
	}

  	const handleShow = () => setShow(true);

	const handleShowProductModal = () => setShowProductModal(false);
	const showProduct = (product) => {
		setProductDetails(product);
		setShowProductModal(true);
	}

  	const handleProductImages = (e) => {
		setProductImages([...productImages, e.target.files[0]]);
	};

	// Table showing all the products
	const renderProducts = () => {
		return (
			<React.Fragment>
				<Table responsive="sm" style={{ fontSize: 15 }}>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Category</th>
						</tr>
					</thead>
					<tbody>
						{product.products.length > 0
							? product.products.map((item, index) => (
									<tr key={item._id} onClick = {() => showProduct(item)}>
										<td>{index + 1}</td>
										<td>{item.name}</td>
										<td>{item.price}</td>
										<td>{item.quantity}</td>
										<td>{item.category.name}</td>
									</tr>
							  ))
							: null}
					</tbody>
				</Table>
			</React.Fragment>
		);
	}

	// Modal for the add product form
	const renderAddProductModal = () => {
		return (
			<FormModal
				show={show}
				handleClose={handleClose}
				modalTitle={"Add New Product"}
			>
				<FormInput
					label="Product Name"
					placeholder="Enter Name"
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<FormInput
					label="Quantity"
					placeholder="Enter Quantity"
					value={quantity}
					onChange={(e) => setQuantity(e.target.value)}
				/>
				<FormInput
					label="Price"
					placeholder="Enter Amount"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				/>
				<FormInput
					label="Description"
					placeholder="Enter description"
					type="text"
					value={description}
					onChange={(e) => setDiscription(e.target.value)}
				/>
				<FormLabel>Select Parent Category</FormLabel>
				<select
					className="form-control"
					value={categoryId}
					onChange={(e) => setCategoryId(e.target.value)}
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
				<FormLabel>Product Images</FormLabel>
				<br></br>

				{/* Showing the added images  */}
				{productImages.length > 0
					? productImages.map((pic, index) => <div key={index}>{pic.name}</div>)
					: null}
				<input
					type="file"
					name="productImages"
					onChange={handleProductImages}
				/>
			</FormModal>
		);
	}

	const renderShowProductDetailsModal = () => {
		if(!productDetails){
			return null;	// initial condition where the product is null & condition is false
		}

		return (
			<FormModal
				show={showProductModal}
				handleClose={handleShowProductModal}
				modalTitle={"Product Details"}
				size="lg"
			>
				<Row>
					<Col md="6">
						<label className='key'>Name</label>
						<p className='value'>{productDetails.name}</p>
					</Col>
					<Col md="6">
						<label className='key'>Price</label>
						<p className='value'>{productDetails.price}</p>
					</Col>
				</Row>
				<Row>
					<Col md="6">
						<label className='key'>Quantity</label>
						<p className='value'>{productDetails.quantity}</p>
					</Col>
					<Col md="6">
						<label className='key'>Category</label>
						<p className='value'>{productDetails.category.name}</p>
					</Col>
				</Row>
				<Row>
					<Col md="12">
						<label className='key'>Description</label>
						<p className='value'>{productDetails.description}</p>
					</Col>
				</Row>
				<Row>
					<Col>
						<label className='key'>Product Images</label>
						<div style={{ display: "flex" }}>
							{
								productDetails.productImages.map((picture, idx) => {
									return(
										<div className='imgContainer' key={idx}>
											<img src={generatePublicUrl(picture.img)} alt={` Product Image-${idx+1} `}/>
										</div>
									);
								})
							}
						</div>
					</Col>
				</Row>
			</FormModal>
		);
	}

    return (
			<Layout sidebar>
				<Container>
					<Row>
						<Col md={12}>
							<div style={{ display: "flex", justifyContent: "space-between" }}>
								<h3>Products</h3>
								<Button variant="primary" onClick={handleShow}>
									Add
								</Button>
							</div>
						</Col>
					</Row>
					<Row>
						<Col>
							{/* Always use paranthesis to call a function otherwise it is just referencing the function */}
							{renderProducts()}
	  					</Col>
					</Row>
				</Container>
				{renderAddProductModal()}
				{renderShowProductDetailsModal()}
			</Layout>
		);
}

export default Products;