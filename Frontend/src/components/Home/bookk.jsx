import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import withGuard from "../../utils/withGuard";
import { CreateBooking, getCourt } from "../../api/api";

const Bookk = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [court, setCourt] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookingStatus, setBookingStatus] = useState("");

  useEffect(() => {
    const fetchCourtDetails = async () => {
      try {
        const response = await getCourt(id);
        setCourt(response.court);
      } catch (error) {
        console.error("Error fetching court details:", error);
      }
    };
    fetchCourtDetails();
  }, [id]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
    setBookingStatus("");

    if (court && court.availability) {
      const selectedAvailability = court.availability.find(
        (availability) =>
          new Date(availability.date).toISOString().split("T")[0] === date
      );

      if (selectedAvailability) {
        setAvailableTimeSlots(selectedAvailability.timeSlots);
      } else {
        setAvailableTimeSlots([]);
      }
    }
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTimeSlot) {
      alert("Please select a date and a time slot.");
      return;
    }

    const bookingData = {
      courtId: court._id,
      date: selectedDate,
      timeSlot: {
        start: selectedTimeSlot.start,
        end: selectedTimeSlot.end,
      },
    };
    try {
      const result = await CreateBooking(bookingData);
      setBookingStatus("Booking successful!");
      setAvailableTimeSlots((slots) =>
        slots.filter((slot) => slot._id !== selectedTimeSlot._id)
      );
      setSelectedTimeSlot(null);
      console.log(result);
      navigate("/profile/reservations", { state: { bookingCreated: true } });
    } catch (error) {
      setBookingStatus("Error booking the court. Please try again.");
      console.error("Error creating booking:", error);
    }
  };

  if (!court) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-primary">
        Loading...
      </div>
    );
  }

  // Calculate duration if timeSlot is selected
  let durationMins = 0;
  if (selectedTimeSlot) {
    const startParts = selectedTimeSlot.start.split(":");
    const endParts = selectedTimeSlot.end.split(":");
    if (startParts.length === 2 && endParts.length === 2) {
       const startMins = parseInt(startParts[0])*60 + parseInt(startParts[1]);
       const endMins = parseInt(endParts[0])*60 + parseInt(endParts[1]);
       durationMins = endMins - startMins;
    }
  }

  return (
    <>
      <style>{`
        .glass-panel {
            background: rgba(42, 42, 42, 0.4);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .neon-glow {
            box-shadow: 0 0 20px rgba(195, 244, 0, 0.2);
        }
        .neon-text-glow {
            text-shadow: 0 0 10px rgba(195, 244, 0, 0.5);
        }
        .time-bubble {
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .time-bubble.selected {
            transform: scale(1.1);
            background-color: #c3f400; /* theme('colors.primary-container') */
            color: #161e00; /* theme('colors.on-primary-container') */
            box-shadow: 0 0 25px rgba(195, 244, 0, 0.4);
            border-color: #c3f400;
        }
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
            cursor: pointer;
        }
      `}</style>
      <div className="antialiased min-h-screen flex flex-col pt-20 pb-20 md:pb-0 bg-background text-on-background">
        {/* TopAppBar */}
        <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-white/15 shadow-[0_0_20px_rgba(171,214,0,0.1)] flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20">
          <div onClick={() => navigate(-1)} className="flex items-center gap-sm cursor-pointer active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_back</span>
            <span className="font-headline-md text-headline-md text-primary">Back</span>
          </div>
          <div className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary italic tracking-tighter hidden md:block">ThePadelCourt</div>
          <div className="flex gap-md"></div>
        </header>

        <main className="flex-grow flex flex-col lg:flex-row gap-lg px-margin-mobile md:px-margin-desktop py-lg max-w-[1600px] mx-auto w-full mt-10 md:mt-16">
          {/* Left Column: Content & Selection */}
          <div className="flex-1 flex flex-col gap-xl">
            {/* Hero Gallery */}
            <section className="flex flex-col gap-base">
              <div className="relative w-full h-[409px] md:h-[512px] rounded-xl overflow-hidden glass-panel group">
                <img alt={court.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={court.courtImg?.url || "https://lh3.googleusercontent.com/aida-public/AB6AXuBiAf-AxQWZkVGi8id4njBeeBzMO68FeGHweOlwq1mlR4s4yE9rdzMADLnz4-RPH9xPIdKT6UfcZewEXTyqMY8g8XwWQuoC_IvLMsnprwV57l_boDjAEk-84v5hW_g_MNMpFXNJ3GQuWpi_b-4zQbwRYo63IF9OE381mldLP4_e44iXiFd6dGqsyF4URSsqxLHDG4-_MSF1g_W4dnp_OOe_BrIhMbP4P69sQufW5Y7KgYUR-VjRtLlmyzBg7rypoAeMb3lOF_LLY1s"} />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                <div className="absolute bottom-md left-md right-md flex justify-between items-end">
                  <div>
                    <span className="inline-block px-sm py-xs rounded-full bg-primary-container/20 border border-primary-container text-primary-container font-label-sm text-label-sm mb-sm backdrop-blur-md">Premium Indoor</span>
                    <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary neon-text-glow">{court.name}</h1>
                    <div className="flex items-center gap-xs mt-xs text-on-surface-variant font-body-md text-body-md">
                      <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                      <span>{court.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Interactive Calendar & Date Picker */}
            <section className="flex flex-col gap-md">
              <h2 className="font-headline-md text-headline-md text-primary">Select Date</h2>
              <div className="flex gap-sm overflow-x-auto no-scrollbar pb-sm -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
                <input
                  type="date"
                  className="glass-panel text-primary p-3 rounded-lg border border-primary-container bg-primary-container/10 focus:outline-none"
                  onChange={(e) => handleDateChange(e.target.value)}
                  value={selectedDate}
                  required
                />
              </div>
            </section>

            {/* Time Slots */}
            <section className="flex flex-col gap-md">
              <h2 className="font-headline-md text-headline-md text-primary">Available Slots</h2>
              <div className="glass-panel rounded-xl p-md flex flex-col gap-md min-h-[150px]">
                {selectedDate ? (
                  availableTimeSlots.length > 0 ? (
                    <div className="flex flex-wrap gap-sm">
                      {availableTimeSlots.map((slot) => (
                        <button
                          key={slot._id}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`time-bubble px-md py-sm rounded-full font-body-md text-body-md ${
                            selectedTimeSlot?._id === slot._id
                              ? "selected"
                              : "glass-panel text-primary border border-white/15 hover:border-primary-container/50"
                          }`}
                        >
                          {slot.start} - {slot.end}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-on-surface-variant font-body-md flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">event_busy</span>
                      No available time slots for this date.
                    </p>
                  )
                ) : (
                  <p className="text-on-surface-variant font-body-md">Please select a date to see available slots.</p>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Booking Summary */}
          <div className="w-full lg:w-[400px] flex-shrink-0">
            <div className="sticky top-32 glass-panel rounded-xl p-lg flex flex-col gap-lg shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <div>
                <h2 className="font-headline-md text-headline-md text-primary mb-xs">Booking Summary</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Review details before confirming.</p>
              </div>
              <div className="flex flex-col gap-sm">
                <div className="flex justify-between items-center py-xs border-b border-white/10">
                  <span className="font-body-md text-body-md text-on-surface-variant flex items-center gap-xs">
                    <span className="material-symbols-outlined text-sm">calendar_today</span> Date
                  </span>
                  <span className="font-label-md text-label-md text-primary">{selectedDate || "Not Selected"}</span>
                </div>
                <div className="flex justify-between items-center py-xs border-b border-white/10">
                  <span className="font-body-md text-body-md text-on-surface-variant flex items-center gap-xs">
                    <span className="material-symbols-outlined text-sm">schedule</span> Time
                  </span>
                  <span className="font-label-md text-label-md text-primary-container">
                    {selectedTimeSlot ? `${selectedTimeSlot.start} - ${selectedTimeSlot.end}` : "Not Selected"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-xs border-b border-white/10">
                  <span className="font-body-md text-body-md text-on-surface-variant flex items-center gap-xs">
                    <span className="material-symbols-outlined text-sm">timer</span> Duration
                  </span>
                  <span className="font-label-md text-label-md text-primary">
                    {durationMins > 0 ? `${durationMins} mins` : "-"}
                  </span>
                </div>
              </div>
              <div className="bg-surface-container-highest/50 rounded-lg p-sm border border-white/5">
                <div className="flex justify-between items-end">
                  <span className="font-body-lg text-body-lg text-on-surface-variant">Total</span>
                  <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary">${court.pricePerHour}</span>
                </div>
              </div>
              <button
                onClick={handleBooking}
                disabled={!selectedDate || !selectedTimeSlot}
                className={`w-full font-headline-md text-headline-md py-sm rounded-lg hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-sm mt-sm ${
                  !selectedDate || !selectedTimeSlot
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed border-none opacity-50"
                    : "bg-primary-container text-on-primary-container neon-glow"
                }`}
              >
                Confirm Booking
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              {bookingStatus && (
                <p className={`text-center font-label-md text-label-md ${bookingStatus.includes("Error") ? "text-error" : "text-green-500"}`}>
                  {bookingStatus}
                </p>
              )}
              <p className="text-center font-label-sm text-label-sm text-on-surface-variant/60">Free cancellation up to 24h before.</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default withGuard(Bookk);
