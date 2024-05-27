import { useState, useEffect } from 'react'
const AddProduct = () => {
    const [productName, setproductName] = useState('');
    const [productPrice, setproductPrice] = useState('');
    const [productDescription, setproductDescription] = useState('');
    const [size, setSize] = useState('s');

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = { productName, productPrice, productDescription, size };
        console.log(product);
    }

    return ( 
        <div className="addproduct">
            <h2>Add new Product</h2>
            <form onSubmit={handleSubmit}>
                <label> Product name: </label>
                <input 
                    type="text" 
                    required
                    value={productName}
                    onChange={(e) => setproductName(e.target.value)}
                />

                <label> Product price: </label>
                <input
                    type="text"
                    required
                    value={productPrice}
                    onChange={(e) => setproductPrice(e.target.value)}
                />

                <label> Product description: </label>
                <textarea 
                    required
                    value={productDescription}
                    onChange={(e) => setproductDescription(e.target.value)}
                ></textarea>

                <label> Product size: </label>
                <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                >
                    <option value="s">S</option>
                    <option value="m">M</option>
                    <option value="l">L</option>
                </select>
                <button>Add Product</button>
            </form>
        </div>
     );
}
 
export default AddProduct;