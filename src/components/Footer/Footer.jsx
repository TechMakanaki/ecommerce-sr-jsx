import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <p>Strapi Ecommerce</p>
        </div>
        <ul className="footer-links">
            <li>About us</li>
            <li>Products</li>
            <li>Our offices</li>
            <li>Company</li>
            <li>Contact</li>
        </ul>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @2024 - All Right Reserved. TechMakanaki</p>
        </div>
    </div>
  )
}

export default Footer