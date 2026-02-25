import TripCard from "../TripCard/TripCard";
import type { Trip } from "../../types/Trip.ts";

import { useState, useEffect } from 'react';

function TripList() {
  const [trips, setTrips] = useState<Trip[]>([]);

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
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {trips.map((trip) => (
          <TripCard key={trip.id} {...trip}></TripCard>
        ))}
      </div>
    </>
  );
}

export default TripList;
