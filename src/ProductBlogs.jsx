import { Link } from "react-router-dom";

const ProductBlogs = ({ products }) => {
    return (
        <div className="products-blog">
            {products.map((product) => (
                <div key={product.id}>
                    <Link to={`/product/${product.id}`}>
                    <h2>{product.productName}</h2>
                    <p>Price : {product.productPrice}</p>
                    </Link>
                </div>
            ))}
        </div>
    )
}
export default ProductBlogs;