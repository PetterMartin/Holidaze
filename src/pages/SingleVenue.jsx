import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { fetchVenuesById } from "../libs/api";
import { getProfile } from "../libs/api";
import Calendar from "../components/calendar/Calendar";

const SingleVenue = () => {
  const [venue, setVenue] = useState(null);
  const [ownerProfile, setOwnerProfile] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const venueId = searchParams.get("id");

    const fetchData = async () => {
      try {
        const data = await fetchVenuesById(venueId);
        setVenue(data.data);
        
        // Fetch owner profile
        const ownerProfileData = await getProfile(data.data.owner.name);
        setOwnerProfile(ownerProfileData.data);
      } catch (error) {
        console.error("Error fetching venue:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      {venue && (
        <>
          <h1>{venue.name}</h1>
          <p>{venue.description}</p>
          <img
            src={venue.media[0].url}
            alt={venue.media[0].alt}
            className="rounded-md mb-2 w-96"
          />
          {ownerProfile && (
            <Link to={`/profile?name=${ownerProfile.name}`}>
              <p>{ownerProfile.name}</p>
            </Link>
          )}
        </>
      )}
      <Calendar />
    </div>
  );
};

export default SingleVenue;
