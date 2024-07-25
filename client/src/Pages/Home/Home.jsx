import React from 'react'
import "./Home.css"
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
      const fetchLocations = async () => {
          try {
              const response = await axios.get('http://localhost:8080/api/addlocation');
              setLocations(response.data);
          } catch (error) {
              console.error('Error fetching locations:', error);
          }
      };

      fetchLocations();
  }, []);

  return (
      <div className="homepage">
          
          <div className="location-list">
              {locations.map((location) => (
                  <div key={location._id} className="location-item">
                      <h2>{location.name}</h2>
                      <img src={`http://localhost:8080/${location.image}`} alt={location.name} className="location-image" />
                      {/* <p>{location.description}</p> */}
                      <p><strong>Type:</strong> {location.locationType}</p>
                      <p><strong>Near by Station:</strong> {location.station}</p>
                      <p><strong>Rating:</strong> {location.rating} ⭐</p>
                      {location.additionalDetails && <p><strong>Details:</strong> {location.additionalDetails}</p>}
                      <button className='view-more'>View more</button>
                  </div>
              ))}
          </div>
      </div>
  );
};

export default Home