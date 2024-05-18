// Navbar.js
import React, { useState, useContext } from "react";
import './Navbar.css';
import { useCart } from '../CartContext';
import Menu from "../../components/svg/bars-solid.svg";
import Close from "../../components/svg/xmark-solid.svg";
import CartIcon from "../../components/svg/cart-shopping-solid.svg";
import { Link } from "react-router-dom";
import { AuthContext } from '../../components/AuthContext';

const Navbar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext); // Destructure logout if used elsewhere

    const [toggle, setToggle] = useState(false);
    const [menu, setMenu] = useState('shop');
    const { cart } = useCart();

    // Function to handle menu toggle
    const menuToggle = () => {
        setToggle(!toggle);
    };

    // Calculate total number of items in the cart
    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <div className="navbar">
            {/* Menu icon for mobile view */}
            <div className="menu" onClick={menuToggle}>
                <img src={Menu} alt="Menu" width="20"/>
            </div>
            
            {/* Logo */}
            <div className="nav-logo">
                <h4><Link to="/">WeMart</Link></h4>
            </div>
            
            {/* Navigation Links */}
            <nav>
                <ul className={toggle ? "toggle" : ""}>
                    {['shop', 'mens', 'womens', 'kids'].map((category) => (
                        <li key={category} onClick={() => setMenu(category)}>
                            <Link style={{ textDecoration: 'none', color: 'black' }} to={`/${category === 'shop' ? '' : category}`}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </Link>
                            {menu === category && <hr />}
                        </li>
                    ))}
                    <li className="close" onClick={menuToggle}>
                        <img src={Close} alt="Close" width="20" />
                    </li>
                </ul>
            </nav>
            
            {/* Login/Logout and Cart Section */}
            <div className="nav-login-cart">
                {isAuthenticated ? (
                    <Link to='/logout' onClick={logout}>Logout</Link>
                ) : (
                    <Link to="/login">Login</Link>
                )}
                <Link to='/cart'>
                    <img src={CartIcon} alt="Cart" width="20" />
                    <span>{cartItemCount}</span>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
