import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import ProductBlogs from './ProductBlogs'
import useAxios from './useAxios'


function App() {
    const {data: products, isLoading} = useAxios('http://localhost:3000/product')

    // useEffect(() => {
    //     axios.get('http://localhost:3000/product')
    //         .then((res) => res.data)
    //         .then(data => {
    //             setProducts(data);
    //             setIsLoading(false);  // การโหลดเสร็จสิ้น
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             setIsLoading(false);  // การโหลดเสร็จสิ้นแม้เกิดข้อผิดพลาด
    //         });
    // }, []);

    return (
        <div>
            {isLoading && <div>Loading...</div>} {/*โหลดข้อมูลก่อน*/}
            {products && <ProductBlogs products={products} />}
            {/* <Navbar /> */}
            {/* <Catalog /> */}
        </div>
    );
}

export default App
