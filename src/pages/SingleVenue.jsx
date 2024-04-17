import { useEffect, useState } from "react";
import { fetchVenuesById } from "../libs/api";

const SingleVenue = () => {
  const [venue, setVenue] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const venueId = searchParams.get("id");

    const fetchData = async () => {
      try {
        const data = await fetchVenuesById(venueId);
        setVenue(data.data);
      } catch (error) {
        console.error("Error fetching venue:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-96">
      {venue && (
        <>
          <h1>{venue.name}</h1>
          <p>{venue.description}</p>
          <img
            src={venue.media[0].url}
            alt={venue.media[0].alt}
            className="rounded-md mb-2"
          />
        </>
      )}
    </div>
  );
};

export default SingleVenue;
