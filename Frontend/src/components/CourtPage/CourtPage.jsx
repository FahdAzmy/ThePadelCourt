/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { getCourts } from "../../api/api";
import withGuard from "../../utils/withGuard";
import CourtCart from "../CourtCart";

const CourtPage = () => {
  // State variables for search filters and court data
  const [searchZone, setSearchZone] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchTime, setSearchTime] = useState("");
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [allCourts, setAllCourts] = useState([]);

  // Extract unique zones from all courts
  const zones = Array.from(new Set(allCourts.map((court) => court.location)));

  // Extract unique time slots from all courts' availability
  const timeSlots = Array.from(
    new Set(
      allCourts.flatMap((court) =>
        court.availability.flatMap((slot) =>
          slot.timeSlots.map((timeSlot) => timeSlot.start)
        )
      )
    )
  );

  // Fetch courts data on component mount
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

  // Handle search filtering for courts based on selected zone, date, and time
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

        // Compare the availability date with the selected search date
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

  // Trigger search on Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="pt-20 px-4 max-md:pr-0 mb-4 max-md:my-2 max-md:mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">Our Courts</h1>

      {/* Search Filters */}
      <div className="mb-6 mr-3 ">
        <div className="flex gap-2 flex-col md:flex-row md:space-x-2 mb-4">
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

      {/* Display courts based on the filtered results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourts.length > 0 ? (
          filteredCourts.map((court) => (
            <CourtCart court={court} key={court._id} />
          ))
        ) : (
          <p>No Courts</p>
        )}
      </div>
    </div>
  );
};

export default withGuard(CourtPage);
