import React from "react";
import './App.css';
import ProductView from './components/ProductView';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Products } from './Pages/Products';
import { Login } from './Pages/Login';
import { Shop } from './Pages/Shop';
import Men from "./Pages/ShopCategories/Men";
import Women from "./Pages/ShopCategories/women";
import Kids from "./Pages/ShopCategories/Kids";
import AddToCart from "./Pages/AddToCart";
import { CartProvider } from './components/CartContext';
import Register from "./components/Register";
import Logout from "./components/Logout";
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <AuthProvider>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/mens" element={<Men />} />
          <Route path="/womens" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/product/:productId" element={<Products />} />
          <Route path="/product-details/:Id" element={<ProductView />} />
          <Route path="/cart" element={<AddToCart />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
