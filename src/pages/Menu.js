import React, { useState } from 'react';
import FoodItem from '../components/FoodItem';
import '../styles/Menu.css';

const Menu = ({ restaurantId, restaurantName, onAddToCart, onBackClick }) => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock menu data
  const menuCategories = [
    { id: 'all', name: 'All Items' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'mains', name: 'Main Course' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beverages', name: 'Beverages' },
  ];

  const menuItems = [
    {
      id: 1,
      category: 'appetizers',
      name: 'Garlic Bread',
      description: 'Crispy bread with garlic butter and herbs',
      price: 149,
      originalPrice: 199,
      image: 'https://images.unsplash.com/photo-1599599810694-b3a7422e2b48?w=300&h=300&fit=crop',
      isVeg: true,
      rating: 4.5,
    },
    {
      id: 2,
      category: 'appetizers',
      name: 'Cheese Fries',
      description: 'Golden fries topped with melted cheddar cheese',
      price: 179,
      image: 'https://images.unsplash.com/photo-1599499810694-b3a7394-2b48?w=300&h=300&fit=crop',
      isVeg: true,
      rating: 4.3,
    },
    {
      id: 3,
      category: 'mains',
      name: 'Margherita Pizza',
      description: 'Fresh mozzarella, tomato, basil on thin crust',
      price: 299,
      originalPrice: 399,
      image: 'https://images.unsplash.com/photo-1604068549290-daea0aa0d37e?w=300&h=300&fit=crop',
      isVeg: true,
      rating: 4.6,
    },
    {
      id: 4,
      category: 'mains',
      name: 'Spicy Paneer Tikka',
      description: 'Marinated paneer pieces grilled to perfection',
      price: 349,
      image: 'https://images.unsplash.com/photo-1599599810694-b3a7422e2b48?w=300&h=300&fit=crop',
      isVeg: true,
      rating: 4.7,
    },
    {
      id: 5,
      category: 'mains',
      name: 'Butter Chicken',
      description: 'Tender chicken in creamy tomato sauce',
      price: 399,
      originalPrice: 499,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop',
      isVeg: false,
      rating: 4.8,
    },
    {
      id: 6,
      category: 'desserts',
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with molten center',
      price: 249,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop',
      isVeg: true,
      rating: 4.9,
    },
    {
      id: 7,
      category: 'desserts',
      name: 'Cheesecake',
      description: 'Creamy New York style cheesecake',
      price: 229,
      image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=300&h=300&fit=crop',
      isVeg: true,
      rating: 4.4,
    },
    {
      id: 8,
      category: 'beverages',
      name: 'Mango Smoothie',
      description: 'Fresh mango blended with yogurt and ice',
      price: 99,
      image: 'https://images.unsplash.com/photo-1590080876-f9e20a8d6d5a?w=300&h=300&fit=crop',
      isVeg: true,
      rating: 4.5,
    },
    {
      id: 9,
      category: 'beverages',
      name: 'Cold Brew Coffee',
      description: 'Premium cold brew with a smooth finish',
      price: 149,
      image: 'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=300&h=300&fit=crop',
      isVeg: true,
      rating: 4.6,
    },
  ];

  // Filter items based on selected category
  const filteredItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter((item) => item.category === selectedCategory);

  const handleAddToCart = (item) => {
    if (onAddToCart) {
      onAddToCart(item);
    }
    setCartItems([...cartItems, item]);
    // Show feedback
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className="menu">
      {/* Menu Header */}
      <div className="menu-header">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={onBackClick}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: '2px solid white',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
              title="Back to restaurants"
            >
              ← Back
            </button>
            <div>
              <h1 className="menu-title">{restaurantName || 'Restaurant Menu'}</h1>
              <p className="menu-subtitle">Explore our delicious offerings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <section className="menu-categories">
        <div className="container">
          <div className="category-tabs">
            {menuCategories.map((category) => (
              <button
                key={category.id}
                className={`category-tab ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Items Grid */}
      <section className="menu-items-section">
        <div className="container">
          <div className="menu-items-grid">
            {filteredItems.map((item) => (
              <FoodItem
                key={item.id}
                {...item}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
