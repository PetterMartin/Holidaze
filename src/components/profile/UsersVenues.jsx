import { useEffect, useState } from "react";
import { fetchVenuesByProfile } from "../../libs/api";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../auth/Auth";

function UsersVenues() {
  const searchParams = new URLSearchParams(window.location.search);
  const userName = searchParams.get("name");
  const [venues, setVenues] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserVenues = async () => {
      try {
        if (userName && user) {
          const data = await fetchVenuesByProfile(userName);
          setVenues(data || []);
        } else {
          console.warn("User is not logged in.");
        }
      } catch (error) {
        console.error("Error fetching user venues:", error);
      }
    };

    fetchUserVenues();
  }, [userName, user]);

  return (
    <main className="container mx-auto lg:px-20 mt-4 text-black">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {venues.map(({ id, name, description, media }) => (
          <div key={id} className="relative">
            <Link to={`/singlevenue?id=${id}`} key={id} className="venue-link">
              <div className="venue-item overflow-hidden border p-4 rounded-3xl shadow-xl">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                  <img
                    src={media[0].url}
                    alt="Venue Image"
                    className="object-cover w-full h-full hover:scale-110 transition"
                  />
                </div>
                <div className="flex flex-col gap-2 px-2">
                  <div className="font-semibold text-xl text-gray-700 mt-3">
                    {name}
                  </div>
                  <div className="text-gray-600">{description}</div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}

export default UsersVenues;