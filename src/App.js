import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchResults, setSearchResults] = useState(null);

  const handleViewRestaurant = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setCurrentPage('menu');
  };

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      setSearchResults(searchTerm);
      setCurrentPage('home');
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
    alert(isLoggedIn ? 'Logged out!' : 'Logged in successfully!');
  };

  return (
    <div className="App">
      <Navbar
        cartCount={cartItems.length}
        isLoggedIn={isLoggedIn}
        onLoginClick={handleLogin}
        onCartClick={() => handleNavigate('cart')}
        onLogoClick={() => handleNavigate('home')}
        onSearch={handleSearch}
      />
      <main className="main-content">
        {currentPage === 'home' && (
          <Home onSelectRestaurant={handleViewRestaurant} searchTerm={searchResults} />
        )}
        {currentPage === 'menu' && selectedRestaurant && (
          <Menu
            restaurantId={selectedRestaurant.id}
            restaurantName={selectedRestaurant.name}
            onAddToCart={handleAddToCart}
            onBackClick={() => handleNavigate('home')}
          />
        )}
        {currentPage === 'cart' && (
          <Cart
            items={cartItems}
            onContinueShopping={() => handleNavigate('home')}
          />
        )}
      </main>
    </div>
  );
}

export default App;
