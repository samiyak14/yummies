import React, { useState } from 'react';
import '../styles/Navbar.css';

const Navbar = ({
  cartCount = 0,
  isLoggedIn = false,
  onLoginClick,
  onCartClick,
  onLogoClick,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
      setSearchTerm('');
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchTerm);
      setSearchTerm('');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo / App Name */}
        <div className="navbar-logo" onClick={onLogoClick} style={{ cursor: 'pointer' }}>
          <span className="logo-icon">🍔</span>
          <span className="logo-text">Yummies</span>
        </div>

        {/* Search Bar */}
        <form className="navbar-search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search restaurants or dishes..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
          <button type="button" className="search-btn" onClick={handleSearchClick}>
            🔍
          </button>
        </form>

        {/* Right Section: Cart & Login */}
        <div className="navbar-right">
          <button className="cart-btn" onClick={onCartClick} title="View Cart">
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button
            className="login-btn"
            onClick={onLoginClick}
            title={isLoggedIn ? 'Logout' : 'Login'}
          >
            {isLoggedIn ? '👤 Logout' : 'Login'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
