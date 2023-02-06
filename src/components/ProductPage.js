import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductPage.scss'

const ProductPage = (props) => {
    const {id} = useParams();
    const navigate=useNavigate();
    const [product, setProduct] = useState(null);
    useEffect(() => {
        axios.get(`https://4496436b-673e-4e72-960e-1d4e7c4bc692.mock.pstmn.io/products/${id}`)
        .then((result) => {
            setProduct(result.data);
        })
        .catch((error) => {
            console.error(error);
        });
    },[id])
    if(product===null){
        return <h1>상품정보를 받고 있습니다.</h1>
    }
    return (
        <div>
            <button onClick={() => navigate(-1)} id='back-btn'>이전화면</button>
            <div id="image-box">
                <img src={`/${product.imageUrl}`} alt={product.name} />
            </div>
            <div id="profile-box">
                <img src="/images/icons/avatar.png" alt={product.seller} />
                <span className="product-seller">{product.seller}</span>
            </div>
            <div id="contents-box">
                <div id="name">{product.name}</div>
                <div id="price">{product.price} 원</div>
                <div id="createAt">2023.02.03</div>
                <div id="description">{product.description}</div>
            </div>
        </div>
    );
};

export default ProductPage;