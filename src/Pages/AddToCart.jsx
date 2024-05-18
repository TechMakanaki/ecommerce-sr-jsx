// AddToCart.js
import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer";
import { useCart } from '../components/CartContext';
import { Link } from 'react-router-dom';
import './CSS/cartPage.css';
import Checkout from '../components/checkout/index';

const AddToCart = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => {
    const itemPrice = item.attributes?.price ?? 0;
    return total + itemPrice * item.quantity;
  }, 0);
  return (
    <div>
      <Navbar /><br />
      <h2>Your Cart</h2>
      <div className='cart'>
        {cart.length === 0 ? (
          <div>Your cart is empty</div>
        ) : (
          cart.map(({ id, attributes, quantity }) => (
            <div key={id} className='cart-item'>
              <div className='cart-images'>
                <img src={`http://localhost:1337${attributes?.images?.data?.[0]?.attributes?.url}`} 
                alt={attributes?.Product}/>
              </div>
              <div className='cart-details'>
                <Link to={`/product-details/${id}`}>{attributes?.Product}</Link>
                <div>Price: ${(attributes?.price ?? 0) * quantity}</div>
                <div>Quantity: {quantity}</div>
                <button onClick={() => addToCart({ id, attributes })}>+</button>
                <button onClick={() => removeFromCart(id)} style={{backgroundColor: 'red'}}>-</button>
              </div>
            </div>
          ))
        )}
        {cart.length > 0 && (
        <div className='cart-summary'>
          <h3>Total Amount: ${totalPrice.toFixed(2)}</h3>
          <Checkout cart={cart} />
        </div>
      )}
      </div>
      
      <br />
      <div className="add-to-cart-container">
        <Link to="/">
          <button className="add-to-cart-button">Continue Shopping</button>
        </Link>
      </div><br />
      <Footer/>
    </div>
  );
};

export default AddToCart;
