import { useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import courtsData from "./courts.json";

const CourtPage = () => {
  const [searchZone, setSearchZone] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchTime, setSearchTime] = useState("");
  const [filteredCourts, setFilteredCourts] = useState(courtsData);

  const zones = Array.from(new Set(courtsData.map((court) => court.zone)));

  const handleSearch = () => {
    setFilteredCourts(
      courtsData.filter((court) => {
        const isZoneMatch = court.zone
          .toLowerCase()
          .includes(searchZone.toLowerCase());
        const isTimeMatch = court.availableTimes.some(
          (time) => time === searchTime
        );

        // Convert court.date from mm/dd/yyyy to yyyy-mm-dd for comparison
        const [month, day, year] = court.date.split("/");
        const formattedCourtDate = `${year}-${month}-${day}`; 

        const isDateMatch = searchDate
          ? formattedCourtDate === searchDate
          : true; // Check if the date matches

        return (
          (searchZone ? isZoneMatch : true) &&
          (searchDate ? isDateMatch : true) &&
          (searchTime ? isTimeMatch : true)
        );
      })
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="pt-20 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Our Courts</h1>

      {/* Search Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:space-x-2 mb-4">
          <select
            className="border rounded-lg p-2 flex-1"
            value={searchZone}
            onChange={(e) => setSearchZone(e.target.value)}
            onKeyDown={handleKeyDown}
          >
            <option value="">Select Zone</option>
            {zones.map((zone, index) => (
              <option key={index} value={zone}>
                {zone}
              </option>
            ))}
          </select>
          <input
            type="date"
            className="border rounded-lg p-2 flex-1"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <select
            className="border rounded-lg p-2 flex-1"
            value={searchTime}
            onChange={(e) => setSearchTime(e.target.value)}
            onKeyDown={handleKeyDown}
          >
            <option value="">Select Time</option>
            {Array.from(
              new Set(courtsData.flatMap((court) => court.availableTimes))
            ).map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>

          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourts.map((court, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105 bg-white"
          >
            <img
              src={court.image}
              alt={court.name}
              className="w-full h-48 object-cover transition duration-300 ease-in-out hover:scale-105"
            />
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-2">{court.name}</h2>
              <div className="flex items-center mb-1">
                <FaMapMarkerAlt className="text-lime-500 mr-2" />
                <p className="text-gray-700 text-sm">{`${court.zone}, ${court.location}`}</p>
              </div>
              <p className="text-gray-600 mb-2">{court.description}</p>
              <p className="text-gray-600 mb-2">Date: {court.date}</p>
              <div className="flex items-center mb-3">
                <FaClock className="text-lime-500 mr-2" />
                <p className="text-gray-700 text-sm">
                  Open: {court.availableTimes.join(", ")}
                </p>
              </div>
              <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center font-semibold"
                onClick={() =>
                  alert(`Booking ${court.name} at ${court.availableTimes[0]}`)
                }
              >
                <FaCalendarAlt className="mr-2" />
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourtPage;
