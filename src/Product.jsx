import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAxios from './useAxios';
import Menu from './Menu';
import './index.css';

function Product() {
    const { id } = useParams();
    const { data: product, isLoading } = useAxios('http://localhost:3000/product/' + id);

    return (
        <div className="product-page">
            <Menu />
            <div className="product-details">
                {isLoading && <div>Loading...</div>}
                {product && (
                    <article className="product-article">
                        <img src={product.productImage} alt={product.productName} className="product-detail-image" />
                        <div className="product-info">
                            <h2 className="product-name">{product.productName}</h2>
                            <p className="product-price">Price: {product.productPrice}</p>
                            <p className="product-description">{product.productDescription}</p>
                        </div>
                    </article>
                )}
            </div>
        </div>
    );
}

export default Product;
