import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function Product() {
    const [products, setProducts] = useState([]);  // เริ่มต้นเป็นอาร์เรย์ว่าง
    const [isLoading, setIsLoading] = useState(true);  // เริ่มต้นเป็น true เพื่อแสดงการโหลด

    useEffect(() => {
        axios.get('http://localhost:3000/product')
            .then((res) => res.data)
            .then(data => {
                setProducts(data);
                setIsLoading(false);  // การโหลดเสร็จสิ้น
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);  // การโหลดเสร็จสิ้นแม้เกิดข้อผิดพลาด
            });
    }, []);

    return (
        <>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {products.map((product) => (
                        <div key={product.id}>{product.productName}</div>
                    ))}
                </div>
            )}
            {/* <Navbar /> */}
            {/* <Catalog /> */}
        </>
    );
}

export default Product;