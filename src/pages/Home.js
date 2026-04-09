import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';
import '../styles/Home.css';

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://13.232.205.146:8000/restaurants');
        if (!response.ok) throw new Error('Failed to fetch restaurants');
        const data = await response.json();
        setRestaurants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  const handleViewRestaurant = (restaurant) => {
    navigate(`/menu/${restaurant.id}`);
  };

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container error">Error: {error}</div>;

  return (
    <div className="container">
      <h1>Restaurants</h1>
      <div className="restaurants-grid">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            id={restaurant.id}
            name={restaurant.name}
            image={restaurant.image || 'https://via.placeholder.com/300x200?text=Restaurant'}
            rating={restaurant.rating || 4.5}
            reviews={restaurant.reviews || 100}
            deliveryTime={restaurant.delivery_time || 30}
            deliveryFee={restaurant.delivery_fee || 0}
            cuisine={restaurant.cuisine || 'Various'}
            onViewDetails={() => handleViewRestaurant(restaurant)}
          />
        ))}
      </div>
    </div>
  );
}