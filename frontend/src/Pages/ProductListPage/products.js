import React from 'react';
import "./product.css";
import Layout from "../../components/Layout/layout.js"
import ProductStore from './ProductStore/productStore';
import { useLocation } from 'react-router-dom';
import ProductPage from './ProductPage/productPage';

function Products(props) {
	// custom hook to get the search params of the url
	const useQuery = () => new URLSearchParams(useLocation().search);
	const query = useQuery();

	const renderProduct = () => {
		const id = query.get('cid');
		const type = query.get('type');
		{console.log(id + " " + type)}
		let content = null;
		switch(type) {
			case 'store':
				content = <ProductStore {...props}/>
				break;
			case 'page':
				content = <ProductPage {...props}/>
				break;
			default:
				content = null;
				break;
		}
		return content;
	}

  	return (
		<Layout>
			{renderProduct()}
		</Layout>
	);
}

export default Products;