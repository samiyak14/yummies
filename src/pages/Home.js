import React, { useState, useMemo } from 'react';
import RestaurantCard from '../components/RestaurantCard';
import '../styles/Home.css';

const Home = ({ onSelectRestaurant, searchTerm = null }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Category data
  const categories = [
    { id: 'all', name: 'All', icon: '🍽️' },
    { id: 'pizza', name: 'Pizza', icon: '🍕' },
    { id: 'burgers', name: 'Burgers', icon: '🍔' },
    { id: 'chinese', name: 'Chinese', icon: '🥢' },
    { id: 'desserts', name: 'Desserts', icon: '🍰' },
    { id: 'sushi', name: 'Sushi', icon: '🍣' },
    { id: 'biryani', name: 'Biryani', icon: '🍚' },
    { id: 'salads', name: 'Salads', icon: '🥗' },
  ];

  // Mock restaurant data
  const restaurants = [
    {
      id: 1,
      name: 'Pizza Palace',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop',
      rating: 4.5,
      reviews: 2340,
      deliveryTime: 30,
      deliveryFee: 40,
      cuisine: 'Pizza, Italian',
      isPromoted: true,
    },
    {
      id: 2,
      name: 'Burger House',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
      rating: 4.3,
      reviews: 1890,
      deliveryTime: 25,
      deliveryFee: 30,
      cuisine: 'Burgers, American',
      isPromoted: false,
    },
    {
      id: 3,
      name: 'Dragon Wok',
      image: 'https://images.unsplash.com/photo-1585521537066-42ec6995d924?w=400&h=300&fit=crop',
      rating: 4.6,
      reviews: 3120,
      deliveryTime: 35,
      deliveryFee: 25,
      cuisine: 'Chinese, Asian',
      isPromoted: true,
    },
    {
      id: 4,
      name: 'Biryani Express',
      image: 'https://images.unsplash.com/photo-1599043513778-f8dbb0b331a7?w=400&h=300&fit=crop',
      rating: 4.4,
      reviews: 2670,
      deliveryTime: 40,
      deliveryFee: 35,
      cuisine: 'Indian, Biryani',
      isPromoted: false,
    },
    {
      id: 5,
      name: 'Sweet Cravings',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
      rating: 4.7,
      reviews: 1540,
      deliveryTime: 20,
      deliveryFee: 20,
      cuisine: 'Desserts, Bakery',
      isPromoted: true,
    },
    {
      id: 6,
      name: 'Tokyo Sushi',
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 2890,
      deliveryTime: 28,
      deliveryFee: 50,
      cuisine: 'Sushi, Japanese',
      isPromoted: false,
    },
    {
      id: 7,
      name: 'Green Gardens',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
      rating: 4.2,
      reviews: 1205,
      deliveryTime: 22,
      deliveryFee: 25,
      cuisine: 'Salads, Healthy',
      isPromoted: false,
    },
    {
      id: 8,
      name: 'Spice Junction',
      image: 'https://images.unsplash.com/photo-1504674900566-8c9bbf1d5f2d?w=400&h=300&fit=crop',
      rating: 4.5,
      reviews: 3045,
      deliveryTime: 32,
      deliveryFee: 30,
      cuisine: 'Indian, Curry',
      isPromoted: true,
    },
  ];

  // Filter restaurants based on search and category
  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const search = searchTerm || '';
      const matchesSearch = search.trim() === '' ||
        restaurant.name.toLowerCase().includes(search.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'all' ||
        restaurant.cuisine.toLowerCase().includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Order Food Online</h1>
          <p className="hero-subtitle">Delicious food from your favorite restaurants delivered to your door</p>
        </div>
      </section>

      {/* Search Section - Handled via Navbar */}

      {/* Category Filters */}
      <section className="category-section">
        <div className="container">
          <h2 className="section-title">Explore Cuisines</h2>
          <div className="category-list">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants Grid */}
      <section className="restaurants-section">
        <div className="container">
          <h2 className="section-title">
            {selectedCategory === 'all' ? 'Popular Restaurants' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Restaurants`}
          </h2>
          
          {filteredRestaurants.length > 0 ? (
            <div className="restaurants-grid">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  {...restaurant}
                  onViewDetails={() => onSelectRestaurant(restaurant)}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>No restaurants found. Try different filters or search terms!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
