import { useEffect, useState } from "react";
import { fetchVenuesById } from "../libs/api/Venues";
import { getProfile } from "../libs/api/Profiles";

const useVenueData = (venueId, isModalOpen) => {
  const [venue, setVenue] = useState(null);
  const [ownerProfile, setOwnerProfile] = useState(null);
  const [price, setPrice] = useState(0);
  const [maxGuests, setMaxGuests] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const venueData = await fetchVenuesById(venueId);
        setVenue(venueData.data);

        setPrice(venueData.data.price);
        setMaxGuests(venueData.data.maxGuests);

        const ownerProfileData = await getProfile(venueData.data.owner.name);
        setOwnerProfile(ownerProfileData.data);
      } catch (error) {
        console.error("Error fetching venue:", error);
      }
    };

    if (isModalOpen && venueId) {
      fetchData();
    }
  }, [isModalOpen, venueId]);

  return { venue, ownerProfile, price, maxGuests };
};

export default useVenueData;