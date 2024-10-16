import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import withGuard from "../../utils/withGuard";
import { CreateBooking, getCourt } from "../../api/api";

const Bookk = () => {
  const { id } = useParams();
  const [court, setCourt] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(""); // State to track booking status

  useEffect(() => {
    const fetchCourtDetails = async () => {
      try {
        const response = await getCourt(id);
        setCourt(response.court);
        // console.log(response.court);
      } catch (error) {
        console.error("Error fetching court details:", error);
      }
    };

    fetchCourtDetails();
  }, [court, id]);

  // Function to fetch available time slots based on the selected date
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);

    // Assuming court.availability is an array of objects with date and time slots
    const selectedAvailability = court.availability.find(
      (availability) =>
        new Date(availability.date).toISOString().split("T")[0] === date
    );

    if (selectedAvailability) {
      setAvailableTimeSlots(selectedAvailability.timeSlots);
    } else {
      setAvailableTimeSlots([]);
    }
  };
  const handleBooking = async () => {
    if (!selectedDate || !selectedTimeSlot) {
      alert("Please select a date and a time slot.");
      return;
    }

    const bookingData = {
      courtId: court._id, // Use the court ID from the state
      date: selectedDate,
      timeSlot: {
        start: selectedTimeSlot.start,
        end: selectedTimeSlot.end,
      },
    };
    try {
      const result = await CreateBooking(bookingData);
      setBookingStatus("Booking successful!");
      console.log(result);
    } catch (error) {
      setBookingStatus("Error booking the court. Please try again.");
      console.error("Error creating booking:", error);
    }
  };
  if (!court) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-between mt-28 bg-white rounded-lg shadow-lg p-6 max-w-5xl mx-auto my-10">
        <div className="w-2/5">
          <img
            src={court.courtImg.url}
            alt="Court"
            className="w-full h-96 rounded-lg"
          />
        </div>

        <div className="w-3/5 pl-6">
          <h2 className="text-2xl font-bold mb-2">{court.name}</h2>
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            size="1x"
            style={{ color: "black" }}
            className="mr-2 font-bold"
          />
          <span className="font-semibold "> {court.location}</span>
          <div className="my-4">
            <label className="font-semibold">Select Date:</label>
            <input
              type="date"
              className="border rounded p-2 ml-2"
              onChange={handleDateChange}
              required
            />
          </div>

          <div className="my-4">
            <label className="font-semibold">Available Time Slots:</label>
            <div>
              {availableTimeSlots.length > 0 ? (
                availableTimeSlots.map((slot) => (
                  <button
                    key={slot._id}
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`border rounded p-2 m-1 ${
                      selectedTimeSlot?._id === slot._id
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {slot.start} - {slot.end}
                  </button>
                ))
              ) : (
                <p>No available time slots for this date.</p>
              )}
            </div>
          </div>

          {selectedTimeSlot && (
            <div className="mt-6">
              <h2 className="font-semibold">Selected Time Slot:</h2>
              <p>
                {selectedTimeSlot.start} - {selectedTimeSlot.end}
              </p>
            </div>
          )}

          {bookingStatus && (
            <div className="mt-4 text-green-500 font-bold">{bookingStatus}</div>
          )}

          <div className="flex justify-between items-center mt-6">
            <div>
              <h2 className="font-semibold text-xl">Price summary</h2>
              <p className="text-gray-600 font-semibold">
                ${court.pricePerHour} per hour
              </p>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-green-600">
                ${court.pricePerHour}
              </h2>
              <p className="text-gray-500 font-semibold">
                Taxes and charges included
              </p>
            </div>
          </div>

          <div className="mt-6 text-right">
            <button
              onClick={handleBooking}
              className="bg-blue-500 mt-14 font-bold text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
              disabled={!selectedDate || !selectedTimeSlot} // Disable button if date or time slot is not selected
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default withGuard(Bookk);
