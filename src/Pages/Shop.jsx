import React from 'react'
import Navbar from '../components/Navbar/Navbar';
import Popular from '../components/Popular/Popular'
import Footer from "../components/Footer/Footer";
import "./CSS/ShopCategory.css"
import { userData } from '../helpers';

export const Shop = () => {
  const { username } = userData();

  console.log('Username:', username);
  return (
    <div>
      <Navbar />
      <br/>
      <h5>Welcome: {username ? username : 'Guest'}</h5>
      <center><h1>OUR SALES COLLECTIONS</h1></center>
      <br/>
      <Popular/>
      <br />
      <br />
      
        <Footer/>
    </div>
  )
}
