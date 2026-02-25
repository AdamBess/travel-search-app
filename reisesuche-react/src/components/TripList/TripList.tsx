import TripCard from "../TripCard/TripCard";
import type { Trip } from "../../types/Trip.ts";

import { useState, useEffect, type SetStateAction } from "react";

function TripList() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  const filteredTrips = trips.filter((trip) =>
    trip.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    const fetchTrips = async () => {
    const response = await fetch('http://localhost:3000/api/trips');
    const data = await response.json();
    setTrips(data);
  }
  fetchTrips()
  }, [])

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTrips.map((trip) => (
          <TripCard key={trip.id} {...trip}></TripCard>
        ))}
      </div>
    </>
  );
}

export default TripList;
