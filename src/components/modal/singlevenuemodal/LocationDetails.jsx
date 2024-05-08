const LocationDetails = ({ venue }) => {
  return (
    <>
      {venue.location.city && (
        <>
          {venue.location.city.charAt(0).toUpperCase() +
            venue.location.city.slice(1)}
          {venue.location.country || venue.location.continent ? ", " : ""}
        </>
      )}
      {venue.location.country && (
        <>
          {venue.location.country.charAt(0).toUpperCase() +
            venue.location.country.slice(1)}
          {venue.location.continent ? ", " : ""}
        </>
      )}
      {venue.location.continent && (
        <>
          {venue.location.continent.charAt(0).toUpperCase() +
            venue.location.continent.slice(1)}
        </>
      )}
    </>
  );
};

export default LocationDetails;