import React, { useEffect } from 'react';
import './MainPage.css'
import axios from 'axios';
import {Link} from 'react-router-dom'

const MainPage = () => {
    let [products, setProduct] = React.useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/products")//https가 아닌 http
        /* axios.get("https://4496436b-673e-4e72-960e-1d4e7c4bc692.mock.pstmn.io/products") *///postman으로 만든 json data mockSever url
    .then((result) => {//데이터 잘가져왔을때
        const products=result.data.products;
        setProduct(products)
    })
    .catch((error) => {//가져오는거 실패했을시
        console.error(`통신실패 : ${error}`);
    })
    },[]);
    
    return (
        <div>
            <div id="banner">
                <img src="./images/banners/banner1.png" alt="mainImg" />
            </div>
            <h1>Products</h1>
            <div id="product-list">
                {products.map((product, idx) => {
                    return (
                        <div className="product-card" key={idx}>
                            <Link className='product-link' to={`/ProductPage/${product.id}`}>
                                <div><img className="product-img" src={product.imageUrl} alt={product.name} /></div>
                                <div className="product-contents">
                                    <span className="product-name">{product.name}</span>
                                    <span className="product-price">{product.price}</span>
                                    <span className="product-seller">
                                        <img className="product-avatar" src="./images/icons/avatar.png" alt='avatar' />
                                        <span>{product.seller}</span>
                                    </span>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default MainPage;