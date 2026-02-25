import type { Trip } from "../../types/Trip.ts";

function TripCard({
  imageUrl,
  name,
  destination,
  hotelTier,
  rating,
  ratingAmount,
  duration,
  guests,
  price,
}: Trip) {
  return (
    <>
      <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
        <div className="relative h-48">
          <img
            src={imageUrl}
            className="w-full h-full object-cover"
            alt="Reiseziel"
          ></img>
        </div>
        <div className="flex flex-col gap-[10px] p-[15px]">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <h2 className="font-bold text-gray-800 leading-tight">{name}</h2>
              <span className="text-xs text-gray-500">{destination}</span>
            </div>
            <div className="flex gap-0.5 text-yellow-400 text-xs">
              {getHotelTier(hotelTier)}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white font-bold px-2 py-1 rounded text-sm">
              {rating}
            </div>
            <div>
              <p className="text-sm font-bold text-blue-800">
                {getRatingText(rating)}
              </p>
              <p className="text-[10px] text-gray-400">{ratingAmount} Bewertungen</p>
            </div>
          </div>

          <div className="border-t border-gray-100 p-4 flex justify-between items-center bg-gray-50/30">
            <p className="text-sm text-gray-700">
              {duration} Nacht | {guests} Personen ab
              <span className="font-bold text-black"> {price} €</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// calculate ratings text
function getRatingText(rating: number): string {
  if (rating >= 9.5) return "Hervorragend";
  if (rating >= 9.0) return "Exzellent";
  if (rating >= 8.5) return "Sehr gut";
  if (rating >= 8.0) return "Fabelhaft";
  if (rating >= 7.0) return "Gut";
  if (rating >= 5.0) return "Ansprechend";
  return "Zufriedenstellend";
}

// calculate ratings stars
function getHotelTier(hotelTier: number): string {
  if (hotelTier >= 5) return "★★★★★";
  if (hotelTier >= 4) return "★★★★☆";
  if (hotelTier >= 3) return "★★★☆☆";
  if (hotelTier >= 2) return "★★☆☆☆";
  if (hotelTier >= 1) return "★☆☆☆☆";
  return "☆☆☆☆☆";
}

export default TripCard;
