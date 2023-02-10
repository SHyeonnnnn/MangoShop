import React, { useEffect, useState } from 'react';
import './MainPage.css'
import axios from 'axios';
import {Link} from 'react-router-dom'
import dayjs from 'dayjs';
import {Carousel} from 'antd'
import { API_URL } from '../config/constants';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)

const MainPage = () => {
    let [products, setProduct] = React.useState([]);
    const [banners, setBanners] = useState([]);
    useEffect(() => {
        axios.get(`${API_URL}/products`)//https가 아닌 http
        /* axios.get("https://4496436b-673e-4e72-960e-1d4e7c4bc692.mock.pstmn.io/products") *///postman으로 만든 json data mockSever url
    .then((result) => {//데이터 잘가져왔을때
        const products=result.data.product;//경로명 하나하나 확인(개짜증)
        setProduct(products);
    })
    .catch((error) => {//가져오는거 실패했을시
        console.error(`통신실패 : ${error}`);
    })
    },[]);

    axios.get(`${API_URL}/banners`)
    .then((result) => {
        const banners=result.data.banners;
        setBanners(banners)
    }).catch((error) => {
        console.error('에러발생:',error)
    })
    
    return (
        <body>
            <Carousel autoplay autoplaySpeed={1800} nextArrow>
                {banners.map((banner, index) => {
                    return(
                        <Link to={banner.href}>
                            <div id="banner" key={index}>
                                <img src={`${API_URL}/${banner.imageUrl}`} alt="mainImg" />
                            </div>
                        </Link>
                    )
                })}
                
            </Carousel>
            <h1>Products</h1>
            <div id="product-list">
                {products.map((product, idx) => {
                    return (
                        <div className="product-card" key={idx}>
                            {product.soldout === 1 ? <div className="product-blur"></div> : null}
                            <Link className='product-link' to={`/ProductPage/${product.id}`}>
                                <div><img className="product-img" src={`${API_URL}/${product.imageUrl}`} alt={product.name} /></div>
                                <div className="product-contents">
                                    <span className="product-name">{product.name}</span>
                                    <span className="product-price">{product.price}원</span>
                                    <div className='product-footer'>
                                        <span className="product-seller">
                                            <img className="product-avatar" src="./images/icons/avatar.png" alt='avatar' />
                                            <span>{product.seller}</span>
                                        </span>
                                        <span className='product-date'>
                                            {dayjs(product.createdAt).fromNow()}
                                        </span>
                                    </div >
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </body>
    );
};

export default MainPage;