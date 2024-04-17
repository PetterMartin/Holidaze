import { Link } from "@tanstack/react-router";
import { useEffect, useState } from 'react';
import { fetchAllVenues } from '../libs/api'; 

const Venues = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllVenues();
        setVenues(data.data.slice(0, 20));
      } catch (error) {
        console.error('Error fetching venues:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <Link to="/home" className="cursor-pointer text-8xl">Home</Link>
      <div className="grid grid-cols-3 gap-4">
        {venues.map(venue => (
          <div key={venue.id} className="p-4 border border-gray-300 rounded-md">
            <img src={venue.media[0].url} alt={venue.media[0].alt} className="rounded-md mb-2" />
            <h2 className="text-xl font-bold">{venue.name}</h2>
            <p className="text-gray-600">{venue.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Venues;
