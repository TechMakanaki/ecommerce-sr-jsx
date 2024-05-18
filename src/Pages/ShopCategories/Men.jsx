import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import Footer from "../../components/Footer/Footer";
import { useCart } from '../../components/CartContext';
import { Link } from 'react-router-dom'; 
import "../CSS/ShopCategory.css"

const Men = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/shops?populate=*&filters[category][id][$eq]=1")
      .then(({ data }) => {
        // Log the API response for the first item's image
        console.log('Image API Response:', data.data[0].attributes.images.data[0]);
        
        // Extracting only the first ten items from the data array
        const firstTenItems = data.data.slice(0, 10);
        setDataProduct(firstTenItems);
      })
      .catch((error) => setError(error));
  }, []);

  console.log('Data Product:', dataProduct);

  if (error) {
    // Print errors if any
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <div>
      <Navbar /><br />
      <center><h1>Our Men Sales</h1></center>
      <br />
      <div className='popular'>
          {dataProduct.map(({ id, attributes }) => {
            // Construct the image URL for each item
            const imageURL = attributes.images?.data?.[0]?.attributes?.url 
          ? `http://localhost:1337${attributes.images.data[0].attributes.url}`
          : null;
            return (
              <div className="popular-item" key={id}>
              <div>
                <div className='popular-images'>
                  {imageURL && (<img src={imageURL} alt={attributes.Product} />
                )}</div>

                {/* Use Link to create a navigation link */}
                <div className='data-name'>
                  {attributes && 
                    <Link to={`/product-details/${id}`}>{attributes.Product}</Link>
                  }
                </div>
                <div className='price'>Price: ${attributes && attributes.price}</div>
                <button className="add-cart" onClick={() => addToCart({ id, attributes })}>Add to cart</button>
              </div>
              </div>
            );
          })}
        
      
    </div>
      <br/><br/>
      <Footer/>
    </div>
  );
};

export default Men;
