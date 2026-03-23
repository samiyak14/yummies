import React, { useState } from 'react';
import '../styles/FoodItem.css';

const FoodItem = ({
  id,
  image,
  name,
  description,
  price,
  originalPrice,
  isVeg,
  rating,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart({
      id,
      name,
      price,
      quantity,
      image,
    });
    setQuantity(1); // Reset quantity after adding
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const discountPercent = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="food-item">
      {/* Image Container */}
      <div className="food-image-container">
        <img src={image} alt={name} className="food-image" />
        {isVeg && <span className="veg-badge">🥬 Veg</span>}
        {discountPercent > 0 && (
          <span className="discount-badge">{discountPercent}% OFF</span>
        )}
      </div>

      {/* Content */}
      <div className="food-content">
        <div className="food-header">
          <h4 className="food-name">{name}</h4>
          {rating && <span className="food-rating">⭐ {rating}</span>}
        </div>

        <p className="food-description">{description}</p>

        <div className="food-pricing">
          <span className="food-price">₹{price}</span>
          {originalPrice && (
            <span className="food-original-price">₹{originalPrice}</span>
          )}
        </div>

        {/* Quantity & Add to Cart */}
        <div className="food-controls">
          <div className="quantity-selector">
            <button
              className="qty-btn"
              onClick={handleDecrement}
              disabled={quantity === 1}
            >
              −
            </button>
            <span className="qty-display">{quantity}</span>
            <button className="qty-btn" onClick={handleIncrement}>
              +
            </button>
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
