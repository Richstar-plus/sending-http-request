export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const data = await response.json();
  setIsFetching(true);

  if (!response.ok) {
    throw new Error("Failed to fetch places data.");
  }

  return data.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ places }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update user places.");
  }

  return data.message;
}
