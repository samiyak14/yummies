import React, { useState } from 'react';
import '../styles/Cart.css';

const Cart = ({ items = [], onContinueShopping }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Margherita Pizza',
      price: 299,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1604068549290-daea0aa0d37e?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      name: 'Garlic Bread',
      price: 149,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1599999810694-b3a7422e2b48?w=100&h=100&fit=crop',
    },
    {
      id: 3,
      name: 'Mango Smoothie',
      price: 99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1590080876-f9e20a8d6d5a?w=100&h=100&fit=crop',
    },
  ]);

  const [promoCode, setPromoCode] = useState('');

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 40;
  const discount = promoCode === 'SAVE50' ? 50 : 0;
  const tax = Math.round(subtotal * 0.05); // 5% tax
  const total = subtotal + deliveryFee + tax - discount;

  // Handle quantity changes
  const handleIncrement = (itemId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (itemId) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemove = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      alert(`Promo code "${promoCode}" applied!`);
    }
  };

  return (
    <div className="cart-page">
      {/* Cart Header */}
      <div className="cart-header">
        <div className="container">
          <h1 className="cart-title">Your Cart</h1>
          <p className="cart-subtitle">{cartItems.length} items</p>
        </div>
      </div>

      <div className="container">
        {cartItems.length > 0 ? (
          <div className="cart-content">
            {/* Cart Items */}
            <div className="cart-items">
              <h2 className="items-title">Order Summary</h2>
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price">₹{item.price}</p>
                  </div>
                  <div className="item-controls">
                    <div className="quantity-control">
                      <button
                        className="qty-btn-small"
                        onClick={() => handleDecrement(item.id)}
                      >
                        −
                      </button>
                      <span className="qty-display-small">{item.quantity}</span>
                      <button
                        className="qty-btn-small"
                        onClick={() => handleIncrement(item.id)}
                      >
                        +
                      </button>
                    </div>
                    <span className="item-total">
                      ₹{item.price * item.quantity}
                    </span>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary & Checkout */}
            <div className="cart-summary">
              <h2 className="summary-title">Payment Details</h2>

              {/* Promo Code */}
              <div className="promo-section">
                <div className="promo-input-group">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="promo-input"
                  />
                  <button className="promo-btn" onClick={handleApplyPromo}>
                    Apply
                  </button>
                </div>
                <p className="promo-hint">Try "SAVE50" for ₹50 off!</p>
              </div>

              {/* Price Breakdown */}
              <div className="price-breakdown">
                <div className="price-row">
                  <span className="price-label">Subtotal</span>
                  <span className="price-value">₹{subtotal}</span>
                </div>
                <div className="price-row">
                  <span className="price-label">Delivery Fee</span>
                  <span className="price-value">₹{deliveryFee}</span>
                </div>
                <div className="price-row">
                  <span className="price-label">Tax (5%)</span>
                  <span className="price-value">₹{tax}</span>
                </div>
                {discount > 0 && (
                  <div className="price-row discount">
                    <span className="price-label">Discount</span>
                    <span className="price-value">-₹{discount}</span>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="total-section">
                <span className="total-label">Total Amount</span>
                <span className="total-value">₹{total}</span>
              </div>

              {/* Checkout Button */}
              <button className="checkout-btn">Proceed to Checkout</button>

              {/* Continue Shopping */}
              <button
                className="continue-shopping-btn"
                onClick={onContinueShopping}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some delicious food items to your cart</p>
            <button className="explore-btn">Start Exploring</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
