import React, { useEffect } from 'react';
import { useCart } from '../CartContext';
import '../styles/Cart.css';

export default function Cart() {
  const { cartItems, fetchCart, placeOrder } = useCart();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 40;
  const tax = Math.round(subtotal * 0.05); // 5% tax
  const total = subtotal + deliveryFee + tax;

  const handlePlaceOrder = () => {
    placeOrder();
  };

  return (
    <div className="container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image || 'https://via.placeholder.com/100x100?text=Food'} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">₹{item.price}</p>
                  <p className="item-quantity">Quantity: {item.quantity}</p>
                </div>
                <div className="item-total">₹{item.price * item.quantity}</div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee:</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span>₹{tax}</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>
            <button className="place-order-btn" onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
