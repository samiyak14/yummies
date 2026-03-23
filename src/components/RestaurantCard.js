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
  isPromoted,
  onViewDetails,
}) => {
  return (
    <div className="restaurant-card">
      {/* Card Image Container */}
      <div className="card-image-container">
        <img src={image} alt={name} className="card-image" />
        {isPromoted && <span className="promoted-badge">Promoted</span>}
        <div className="card-overlay">
          <button className="card-btn" onClick={onViewDetails}>
            View Details
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="card-content">
        <div className="card-header">
          <h3 className="restaurant-name">{name}</h3>
          <span className="rating-badge">⭐ {rating}</span>
        </div>

        <p className="cuisine-type">{cuisine}</p>

        <div className="card-meta">
          <span className="reviews">({reviews} reviews)</span>
        </div>

        <div className="card-footer">
          <div className="delivery-info">
            <span className="delivery-time">🕐 {deliveryTime} mins</span>
            <span className="delivery-fee">₹{deliveryFee} fee</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
