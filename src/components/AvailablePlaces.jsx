import { useState, useEffect } from "react";
import Error from "./Error.jsx";
import { sortPlacesByDistance } from "../loc.js";

import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(true);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const response = await fetch("http://localhost:3000/places");
        const data = await response.json();
        setIsFetching(true);

        if (!response.ok) {
          throw new Error("Failed to fetch places data.");
        }

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlace = sortPlacesByDistance(
            data.places,
            position.coords.latitude,
            position.coords.longitude,
          );
          setAvailablePlaces(sortedPlace);
          setIsFetching(false);
        });

      } catch (error) {
        setError({
          message:
            error.message || "An error occurred while fetching places data.",
        });
        setIsFetching(false);
      }
    }
    fetchPlaces();
  }, []);

  if (error) {
    return <Error title="An error occurred" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching places data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
