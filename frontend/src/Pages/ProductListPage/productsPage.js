import React, { useEffect } from 'react';
import "./productPage.css";
import { useDispatch, useSelector } from 'react-redux';
import { getProductsBySlug } from '../../actions';
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/layout.js"
import { generatePublicUrl } from '../../helpers/urlConfig';

function ProductsPage() {
  const product = useSelector(state => state.products);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const priceRange = {
		under5k: 5000,
		under10k: "10k",
		under20k: "20k",
		under30k: "30k",
		under40k: "40k",
		under50k: "50k",
		under60k: "60k",
		above60k: ">60k"
	};

  useEffect(() => {
    dispatch(getProductsBySlug(slug));
  }, []);

  return (
		<Layout>
      {
        /* The below method converts object and gives an array with list of keys */
        Object.keys(product.productsByPrice).map((key, index) => {
          return (
						<div className="card">
							<div className="cardHeader">
								<div>{ slug } mobiles under {priceRange[key]}</div>
								<button>View All</button>
							</div>
							<div style={{ display: "flex" }}>
                {
                  product.productsByPrice[key].map(product => {
                    return (
											<div className="productContainer">
												<div className="productImgContainer">
													<img
														src={generatePublicUrl(product.productImages[0].img)}
														alt="product img"
													/>
												</div>
												<div className="productInfo">
													<div style={{ margin: "5px 0" }}>
														{product.name}
													</div>
													<div>
														<span>4.5</span>
														<span>5427</span>
													</div>
													<div className="productPrice">{product.price}</div>
												</div>
											</div>
										);
                  })
                }
							</div>
						</div>
					);
        })
      }
		</Layout>
	);
}

export default ProductsPage;