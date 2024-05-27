//import e from 'express';
import { useState, useEffect } from 'react'
import axios from 'axios'; // import axios ที่นี่

const AddProduct = () => {
    const [productName, setproductName] = useState('');
    const [productPrice, setproductPrice] = useState('');
    const [productDescription, setproductDescription] = useState('');
    const [size, setSize] = useState('s');

    const [product, setProduct] = useState({
        productName: '',
        productPrice: '',
        productDescription: '', // เพิ่ม field productDescription
        size: '',
        image: ''
      });

      const handleSubmit = async (e) => {
        e.preventDefault();
        const imgUrl = await upload();
        console.log(imgUrl)
        try {
            //const token = localStorage.getItem('token');
            console.log(product.image)
            await axios.post('http://localhost:3000/products', {
              name:productName,
              image:imgUrl,
              price:productPrice,
              description:productDescription,
              size:size
            }, {
               
                // headers: { 
                //           'Authorization': `Bearer ${token}`
                // } // กำหนด header
              });
    
              // Redirect to Home
        navigate('/'); 
    
        // handle success
        alert('เพิ่มสินค้าสำเร็จ');
        setProduct({
            productName: '',
            productPrice: '',
            productDescription: '',
            size: '',
            image: null
        });
          // handle success, e.g., redirect to product list or show a success message
        } catch (err) {
          // handle error, e.g., show an error message
        }
      };

    const handleChange = (e) => {
        if (e.target.name === 'image') {
          setProduct({ ...product, image: e.target.files[0] }); // เก็บไฟล์รูปภาพ
        } else {
          setProduct({ ...product, [e.target.name]: e.target.value });
        }
    }

    const upload = async () => {
        try {
            console.log(product.productName);
          const formData = new FormData();
          formData.append("file", product.image);
          console.log(product.image)
          const res = await axios.post("http://localhost:3000/upload", formData);
          return res.data;
        } catch (err) {
          console.log(err);
        }
      };

    return ( 
        <div className="addproduct">
            <h2>Add new Product</h2>
            <form>
                <label> Product name: </label>
                <input 
                    type="text" id="name" name='name'
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
                </form>

                <form onSubmit={handleSubmit}>
                    <input type="file" id="image" accept="image/*" name="image" onChange={handleChange} />
                    <button type="button" onClick={handleSubmit} className="submit-btn">
                        Add Product
                    </button>
                </form>
        </div>
     );
}
 
export default AddProduct;