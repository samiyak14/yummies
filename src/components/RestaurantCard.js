import React from 'react';
import '../styles/RestaurantCard.css';

const RestaurantCard = ({
  id,
  name,
  image,
  rating,
  reviews,
  deliveryTime,
  deliveryFee,
  cuisine,
  onViewDetails,
}) => {
  return (
    <div className="restaurant-card" onClick={onViewDetails}>
      <div className="card-image-container">
        <img src={image} alt={name} className="card-image" />
      </div>
      <div className="card-content">
        <h3 className="restaurant-name">{name}</h3>
        <p className="cuisine-type">{cuisine}</p>
        <div className="card-meta">
          <span className="rating">⭐ {rating}</span>
          <span className="reviews">({reviews} reviews)</span>
        </div>
        <div className="card-footer">
          <span className="delivery-time">🕐 {deliveryTime} mins</span>
          <span className="delivery-fee">₹{deliveryFee} fee</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
