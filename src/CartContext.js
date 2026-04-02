import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (restaurantId, itemId, quantity = 1) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurant_id: restaurantId,
          item_id: itemId,
          quantity,
        }),
      });
      if (!response.ok) throw new Error('Failed to add to cart');
      // Assuming the backend returns updated cart or item added
      // For simplicity, we'll refetch cart after adding
      fetchCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/cart');
      if (!response.ok) throw new Error('Failed to fetch cart');
      const data = await response.json();
      setCartItems(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const placeOrder = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // Assuming no body needed, or add user info if available
      });
      if (!response.ok) throw new Error('Failed to place order');
      const data = await response.json();
      alert(`Order placed successfully! Order ID: ${data.order_id}`);
      setCartItems([]); // Clear cart after order
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  useEffect(() => {
    fetchCart(); // Fetch cart on mount
  }, []);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, fetchCart, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};