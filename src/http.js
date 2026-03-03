export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const data = await response.json();
  setIsFetching(true);

  if (!response.ok) {
    throw new Error("Failed to fetch places data.");
  }

  return data.places;
}
