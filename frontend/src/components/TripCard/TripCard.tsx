import type { Trip } from "../../../../types/Trip.ts";

export default function TripCard({
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
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
        <div className="relative aspect-[4/2]">
          <img
            src={imageUrl}
            className="w-full h-full object-cover"
            alt="Reiseziel"
          ></img>
        </div>
        <div className="flex flex-col gap-[10px] p-[15px]">
          <div className="flex justify-between items-start gap-3 mb-5">
            <div className="flex flex-col min-w-0 flex-1 mr-2">
              <h2 className="text-[18px] font-bold text-[#181818] leading-6 truncate">{name}</h2>
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
              <p className="text-[10px] text-gray-400">{ratingAmount} ratings</p>
            </div>
          </div>

          <div className="border-t border-gray-100 p-4 flex justify-between items-center bg-gray-50/30">
            <p className="text-sm text-gray-700">
              {duration} {duration === 1 ? 'night' : 'nights'} | {guests} {guests === 1 ? 'guest' : 'guests'} from
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
  if (rating >= 9.5) return "Exceptional";
  if (rating >= 9.0) return "Excellent";
  if (rating >= 8.5) return "Very Good";
  if (rating >= 8.0) return "Fabulous";
  if (rating >= 7.0) return "Good";
  if (rating >= 5.0) return "Pleasant";
  return "Satisfactory";
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
