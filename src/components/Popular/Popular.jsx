import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import './Popular.css';

const Popular = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [cartMessage, setCartMessage] = useState({ id: null, message: '' });

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/shops?populate=*")
      .then(({ data }) => {
        const firstTenItems = data.data.slice(0, 10);
        setDataProduct(firstTenItems);
      })
      .catch((error) => setError(error));
  }, []);
  
  const handleAddToCart = (item) => {
    addToCart(item);
    setCartMessage({ id: item.id, message: `Item "${item.attributes.Product}" added to cart` });
    setTimeout(() => {
      setCartMessage({ id: null, message: '' });
    }, 3000); // Hide the message after 3 seconds
  };

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <div className='popular'>
      {dataProduct.map(({ id, attributes }) => {
        const imageURL = `http://localhost:1337${attributes.images.data[0].attributes.url}`;
        return (
          <div className="popular-item" key={id}>
            <div>
              <div className='popular-images'>
                {imageURL && (<img src={imageURL} alt={attributes.Product} />)}
              </div>
              <div className='data-name'>
                {attributes && <Link to={`/product-details/${id}`}>{attributes.Product}</Link>}
              </div>
              <div className='price'>Price: ${attributes && attributes.price}</div>
              {cartMessage.id === id && <div className="cart-message">{cartMessage.message}</div>}
              <button className="add-cart" onClick={() => addToCart({ id, attributes })}>Add to cart</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Popular;
