import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // ✅ ADD TO CART
  const addToCart = async (restaurantId, itemId, quantity = 1) => {
    try {
      const response = await fetch('http://13.126.227.210:8000/cart', {
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

      await fetchCart(); // refresh cart
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // ✅ FETCH CART
  const fetchCart = async () => {
    try {
      const response = await fetch('http://13.232.205.146:8000/cart');

      if (!response.ok) throw new Error('Failed to fetch cart');

      const data = await response.json();

      // 🔥 TEMP FIX: add safe defaults so UI doesn’t break
      const formatted = data.map((item) => ({
        ...item,
        name: item.name || `Item ${item.item_id}`,
        price: item.price || 0,
        image:
          item.image ||
          'https://via.placeholder.com/100x100?text=Food',
      }));

      setCartItems(formatted);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  // ✅ PLACE ORDER
  const placeOrder = async () => {
    try {
      const response = await fetch('http://13.232.205.146:8000/orders', {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to place order');

      const data = await response.json();

      alert(`Order placed successfully! Order ID: ${data.order_id}`);

      setCartItems([]); // clear UI
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, fetchCart, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};