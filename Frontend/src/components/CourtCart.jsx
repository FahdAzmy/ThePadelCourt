/* eslint-disable react/prop-types */
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function CourtCart({ court }) {
  const navigate = useNavigate();

  return (
    <>
      {court && (
        <div className="border mr-6 border-gray-300 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105 bg-white">
          <img
            src={court.courtImg.url} // Access court.courtImg.url correctly
            alt={court.name}
            className="w-full h-48 object-cover transition duration-300 ease-in-out hover:scale-105"
          />
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-2">{court.name}</h2>
            <div className="flex items-center mb-1">
              <FaMapMarkerAlt className="text-lime-500 mr-2" />
              <p className="text-gray-700 text-sm">{court.location}</p>
            </div>
            <p className="text-gray-600 mb-2">
              Date: {new Date(court.availability[0].date).toLocaleDateString()}
            </p>
            <div className="flex items-center mb-3">
              <FaClock className="text-lime-500 mr-2" />
              <p className="text-gray-700 text-sm">
                Open: {court.operatingHours?.start}:00 AM To{" "}
                {court.operatingHours?.end}:00 PM
              </p>
            </div>
            <button
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center font-semibold"
              onClick={() => navigate(`/court/${court._id}`)} // Navigate to court details page
            >
              <FaCalendarAlt className="mr-2" />
              Book Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
