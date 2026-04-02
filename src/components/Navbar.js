import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { cartItems } = useCart();

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // For now, just log or handle search
    console.log('Search:', searchTerm);
    setSearchTerm('');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo / App Name */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🍔</span>
          <span className="logo-text">Yummies</span>
        </Link>

        {/* Search Bar */}
        <form className="navbar-search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search restaurants or dishes..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            🔍
          </button>
        </form>

        {/* Right Section: Cart */}
        <div className="navbar-right">
          <Link to="/cart" className="cart-btn" title="View Cart">
            <span className="cart-icon">🛒</span>
            {cartItems.length > 0 && <span className="cart-badge">{cartItems.length}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
