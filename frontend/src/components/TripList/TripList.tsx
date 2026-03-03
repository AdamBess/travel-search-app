import TripCard from "../TripCard/TripCard";
import type { Trip } from "../../../../types/Trip.ts";

import { useState, useEffect} from "react";

export default function TripList() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchTrips = async () => {
        try {
          setIsLoading(true);
          console.log("Loading trips...");
          const response = await fetch(
            `http://localhost:3000/api/trips?search=${searchTerm}`,
          );
          const data = await response.json();
          setTrips(data);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          setError(error instanceof Error ? error.message : "Unknown error");
          console.error("Error fetching trips:", error);
        }
      };
      fetchTrips();
    }, 400); // Debounce delay of 400ms

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <>
      <div className="mb-6">
        <input
          name="searchInput"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Hotel suchen..."
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-700 placeholder-gray-400"
        />
      </div>
      <div className="mb-4">
        {isLoading && <p className="text-blue-600 font-medium bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">Reisen werden geladen...</p>}
        {error && <p className="text-red-600 font-medium bg-red-50 border border-red-200 rounded-lg px-4 py-3">Fehler beim Laden der Reisen: {error}</p>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trips.map((trip) => (
          <TripCard key={trip.id} {...trip}></TripCard>
        ))}
      </div>
    </>
  );
}
