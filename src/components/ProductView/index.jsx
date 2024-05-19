import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useProductView from './useProductView';
import Navbar from '../Navbar/Navbar';
import Footer from "../Footer/Footer";
import { useCart } from '../CartContext';
import './style.css';

const ProductView = () => {
  const { product, error } = useProductView();
  const { addToCart } = useCart();
  const [cartMessage, setCartMessage] = useState({ id: null, message: '' });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  const { id, attributes } = product.data;
  const productName = attributes?.Product || "";
  const productPrice = attributes?.price || "";
  const productDescription = attributes?.description || '';
  const imageURL = `http://localhost:1337${attributes.images.data[0].attributes.url}`;

  const formattedPrice = parseFloat(productPrice).toFixed(2);

  const handleAddToCart = (item) => {
    addToCart(item);
    setCartMessage({ id: item.id, message: `Item "${item.attributes.Product}" added to cart` });
    setTimeout(() => {
      setCartMessage({ id: null, message: '' });
    }, 3000); // Hide the message after 3 seconds
  };

  return (
    <div>
      <Navbar />
      <h3>Product Details</h3>
      <div className="product-view">
        <div className="product-details">
          <div className="product-image">
            {imageURL && <img src={imageURL} alt={productName} />}
          </div>
          <div className="product-info">
            <h1 className="product-name">{productName}</h1>
            <div className="product-price">Price: ${formattedPrice}</div>
            <p>
              Availability: <span>In Stock</span><br />
              SKU: {productName}
            </p>
            <div className="product-description">Description: {productDescription}</div>
            {cartMessage.id === id && <div className="cart-message">{cartMessage.message}</div>}
            <button className='add-cart' onClick={() => handleAddToCart({ id, attributes })}>
              Add to cart
            </button>
            <Link to="/">Back to Products</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductView;
