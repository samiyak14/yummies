import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FoodItem from '../components/FoodItem';
import '../styles/Menu.css';

export default function Menu() {
  const { id } = useParams();

  const [menuItems, setMenuItems] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/restaurants/${id}/menu`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch menu');
        }

        const data = await response.json();
        setMenuItems(data);

        // Since backend doesn't have restaurant endpoint yet
        setRestaurant({ name: `Restaurant ${id}` });

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [id]);

  if (loading) {
    return <div className="container">Loading menu...</div>;
  }

  if (error) {
    return <div className="container error">Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>{restaurant?.name}</h1>

      <div className="menu-grid">
        {menuItems.length > 0 ? (
          menuItems.map((item) => (
            <FoodItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              description={item.description || 'Delicious food item'}
              image={
                item.image ||
                'https://via.placeholder.com/200x150?text=Food'
              }
              restaurantId={id}
            />
          ))
        ) : (
          <p>No menu items available</p>
        )}
      </div>
    </div>
  );
}