import { useState } from 'react';
import './index.css';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [size, setSize] = useState('s');

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = { productName, productPrice, productDescription, size };
        console.log(product);
    }

    return (
        <div className="add-product-page">
            <div className="add-product-container">
                <h2>Add New Product</h2>
                <form onSubmit={handleSubmit} className="add-product-form">
                    <div className="form-group">
                        <label>Product Name:</label>
                        <input
                            type="text"
                            required
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Product Price:</label>
                        <input
                            type="text"
                            required
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Product Description:</label>
                        <textarea
                            required
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Product Size:</label>
                        <select
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                        >
                            <option value="s">S</option>
                            <option value="m">M</option>
                            <option value="l">L</option>
                        </select>
                    </div>
                    <button type="submit" className="add-product-button">Add Product</button>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
