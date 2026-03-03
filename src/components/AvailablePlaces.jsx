import { useState, useEffect } from "react";
import Error from "./Error.jsx";

import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const response = await fetch("http://localhost:3000/places");
        const data = await response.json();

        if (!response.ok) {
          const error = new Error("Failed to fetch places data.");
          throw new Error("Failed to fetch places data.");
        }
        setAvailablePlaces(data.places);
      } catch (error) {
        setError({
          message:
            error.message || "An error occurred while fetching places data.",
        });
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
      isLoading={availablePlaces.length === 0}
      loadingText="Fetching places data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
