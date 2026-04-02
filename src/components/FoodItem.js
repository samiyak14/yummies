import React from 'react';
import { useCart } from '../CartContext';
import '../styles/FoodItem.css';

const FoodItem = ({ id, name, price, description, image, restaurantId }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(restaurantId, id, 1);
  };

  return (
    <div className="food-item">
      <img src={image} alt={name} className="food-image" />
      <div className="food-details">
        <h3 className="food-name">{name}</h3>
        <p className="food-description">{description}</p>
        <div className="food-footer">
          <span className="food-price">₹{price}</span>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;