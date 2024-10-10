import { useEffect, useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { getCourts } from "../../api/api";

const CourtPage = () => {
  const [searchZone, setSearchZone] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchTime, setSearchTime] = useState("");
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [allCourts, setAllCourts] = useState([]);

  const zones = Array.from(new Set(allCourts.map((court) => court.location)));

  const timeSlots = Array.from(
    new Set(
      allCourts.flatMap((court) =>
        court.availability.flatMap((slot) =>
          slot.timeSlots.map((timeSlot) => timeSlot.start)
        )
      )
    )
  );

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const data = await getCourts();
        setAllCourts(data.courts);
        setFilteredCourts(data.courts);
      } catch (error) {
        console.error("Error Fetching Courts:", error);
      }
    };
    fetchCourts();
  }, []);

  const handleSearch = () => {
    setFilteredCourts(
      allCourts.filter((court) => {
        const isZoneMatch = court.location
          .toLowerCase()
          .includes(searchZone.toLowerCase());

        const isTimeMatch = court.availability.some((availability) =>
          availability.timeSlots.some(
            (timeSlot) => timeSlot.start === searchTime
          )
        );

        // مقارنة التاريخ
        const isDateMatch = court.availability.some(
          (availability) =>
            new Date(availability.date).toLocaleDateString() ===
            new Date(searchDate).toLocaleDateString()
        );

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
            {timeSlots.map((time, index) => (
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
        {filteredCourts.length > 0 ? (
          filteredCourts.map((court) => (
            <div
              key={court._id}
              className="border border-gray-300 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105 bg-white"
            >
              <img
                src={court.courtImg.url}
                alt={court.name}
                className="w-full h-48 object-cover transition duration-300 ease-in-out hover:scale-105"
              />
              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-2">{court.name}</h2>
                <div className="flex items-center mb-1">
                  <FaMapMarkerAlt className="text-lime-500 mr-2" />
                  <p className="text-gray-700 text-sm">{`${court.location}`}</p>
                </div>
                <p className="text-gray-600 mb-2">
                  Date:{" "}
                  {new Date(court.availability[0].date).toLocaleDateString()}
                </p>
                <div className="flex items-center mb-3">
                  <FaClock className="text-lime-500 mr-2" />
                  <p className="text-gray-700 text-sm">
                    Open: {court.operatingHours.start}:00 AM To{" "}
                    {court.operatingHours.end}:00 PM
                  </p>
                </div>
                <button
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center font-semibold"
                  onClick={() =>
                    alert(
                      `Booking ${court.name} at ${court.availability[0].timeSlots[0].start}`
                    )
                  }
                >
                  <FaCalendarAlt className="mr-2" />
                  Book Now
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No Courts</p>
        )}
      </div>
    </div>
  );
};

export default CourtPage;
