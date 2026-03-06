import TripCard from "../TripCard/TripCard";
import type { Trip } from "../../../../types/Trip.ts";

import { useState, useEffect } from "react";

export default function TripList() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("");
  const [sort, order] = sortOption.split("-");
  const API_URL = import.meta.env.VITE_API_URL;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchTrips = async () => {
        try {
          setIsLoading(true);
          console.log("Loading trips...");
          const params = new URLSearchParams();

          if (searchTerm) {
            params.set("search", searchTerm);
          }

          if (sort) {
            params.set("sort", sort);
            params.set("order", order);
          }

          const response = await fetch(
            `${API_URL}/trips?${params}`,
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
  }, [searchTerm, sortOption]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          name="searchInput"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search hotel..."
          className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-700 placeholder-gray-400"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="md:w-1/4 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-700"
        >
          <option value="">No sorting</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
      <div className="mb-4">
        {isLoading && (
          <p className="text-blue-600 font-medium bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
            Loading trips...
          </p>
        )}
        {error && (
          <p className="text-red-600 font-medium bg-red-50 border border-red-200 rounded-lg px-4 py-3">
            Failed to load trips: {error}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {trips.map((trip) => (
          <TripCard key={trip.id} {...trip}></TripCard>
        ))}
      </div>
    </>
  );
}
