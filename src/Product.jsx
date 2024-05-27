import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import useAxios from './useAxios'

function Product() {
    const { id } = useParams()
    const { data: product, isLoading} = useAxios('http://localhost:3000/product/' +id);

    return(
        <div className="product-details">
            <p>productdetais- {id}</p>
            {isLoading && <div>Loading...</div>}
            {product && (
                <article>
                    <h2>{product.productName}</h2>
                    <p>Price : {product.productPrice}</p>
                    <p>Description : {product.productDescription}</p>
                </article>
            )}
        </div>
    );
}

export default Product;