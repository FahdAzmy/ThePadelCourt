import { useEffect, useState } from "react";
import { getCourts } from "../../api/api";
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
        court.availability?.flatMap((slot) =>
          slot.timeSlots.map((timeSlot) => timeSlot.start)
        ) || []
      )
    )
  ).sort();

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
          ?.toLowerCase()
          .includes(searchZone.toLowerCase());

        const isTimeMatch = court.availability?.some((availability) =>
          availability.timeSlots.some(
            (timeSlot) => timeSlot.start === searchTime
          )
        );

        // Compare the availability date with the selected search date
        const isDateMatch = court.availability?.some(
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

  // Auto search when filters change to mimic modern SPA feel
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchZone, searchDate, searchTime]);

  return (
    <>
      <style>{`
        @keyframes bounce-x {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(4px); }
        }
        .hover-bounce-x:hover {
            animation: bounce-x 0.5s ease-in-out infinite;
        }
        .neon-glow {
            box-shadow: 0 0 20px rgba(195, 244, 0, 0.2);
        }
        .neon-glow-hover:hover {
            box-shadow: 0 0 30px rgba(195, 244, 0, 0.4);
        }
        .glass-panel {
            background: rgba(19, 19, 19, 0.6);
            backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .animated-bg {
            background: radial-gradient(circle at 50% 100%, rgba(195, 244, 0, 0.05) 0%, rgba(10, 10, 10, 1) 100%);
        }
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        select option {
            background-color: #131313;
            color: #ffffff;
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
            cursor: pointer;
        }
      `}</style>

      <div className="bg-background text-on-background min-h-screen flex flex-col animated-bg font-body-md overflow-x-hidden pt-24 pb-20 md:pb-10">
        <main className="flex-grow px-margin-mobile md:px-margin-desktop py-lg max-w-[1440px] mx-auto w-full flex flex-col gap-xl">
          {/* Page Header & Filters */}
          <section className="flex flex-col gap-md">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
              <div>
                <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-xs">Available Courts</h1>
                <p className="font-body-md text-body-md text-on-surface-variant">Find and book your next match.</p>
              </div>
              
              {/* Search Bar */}
              <div className="relative w-full md:w-96 group">
                <div className="absolute inset-y-0 left-0 pl-sm flex items-center pointer-events-none text-on-surface-variant group-focus-within:text-primary-fixed transition-colors">
                  <span className="material-symbols-outlined hover-bounce-x">sports_tennis</span>
                </div>
                <input 
                  className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-full py-sm pl-xl pr-md text-primary placeholder-on-surface-variant/50 focus:outline-none focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed transition-all duration-300" 
                  placeholder="Search by club or location..." 
                  type="text"
                  value={searchZone}
                  onChange={(e) => setSearchZone(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap overflow-x-auto no-scrollbar gap-sm pb-xs items-center">
              <button 
                onClick={() => { setSearchZone(""); setSearchDate(""); setSearchTime(""); }}
                className={`${!searchZone && !searchDate && !searchTime ? 'bg-primary-fixed text-on-primary-fixed neon-glow hover:scale-105' : 'glass-panel text-primary hover:border-primary-fixed'} px-md py-base rounded-full font-label-md text-label-md whitespace-nowrap transition-transform`}
              >
                All Courts
              </button>
              
              {/* Dynamic Zone Filter Dropdown */}
              <div className="relative glass-panel rounded-full overflow-hidden hover:border-primary-fixed transition-colors flex items-center pr-2">
                <span className="material-symbols-outlined pl-3 text-[18px] text-on-surface-variant">location_on</span>
                <select
                  className="bg-transparent text-primary py-base pl-2 pr-4 font-label-md text-label-md focus:outline-none cursor-pointer appearance-none"
                  value={searchZone}
                  onChange={(e) => setSearchZone(e.target.value)}
                >
                  <option value="">Zone</option>
                  {zones.map((zone, index) => (
                    <option key={index} value={zone}>{zone}</option>
                  ))}
                </select>
              </div>

              {/* Dynamic Time Filter Dropdown */}
              <div className="relative glass-panel rounded-full overflow-hidden hover:border-primary-fixed transition-colors flex items-center pr-2">
                <span className="material-symbols-outlined pl-3 text-[18px] text-on-surface-variant">schedule</span>
                <select
                  className="bg-transparent text-primary py-base pl-2 pr-4 font-label-md text-label-md focus:outline-none cursor-pointer appearance-none"
                  value={searchTime}
                  onChange={(e) => setSearchTime(e.target.value)}
                >
                  <option value="">Time</option>
                  {timeSlots.map((time, index) => (
                    <option key={index} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              {/* Dynamic Date Filter Input */}
              <div className="relative glass-panel rounded-full overflow-hidden hover:border-primary-fixed transition-colors flex items-center px-3">
                <span className="material-symbols-outlined text-[18px] mr-2 text-on-surface-variant">calendar_month</span>
                <input
                  type="date"
                  className="bg-transparent text-primary py-base font-label-md text-label-md focus:outline-none cursor-pointer"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                />
              </div>
            </div>
          </section>

          {/* Courts Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourts.length > 0 ? (
              filteredCourts.map((court) => (
                <CourtCart court={court} key={court._id} />
              ))
            ) : (
              <div className="col-span-full py-xl text-center glass-panel rounded-xl">
                <span className="material-symbols-outlined text-display-lg text-on-surface-variant mb-4 opacity-50 block">sentiment_dissatisfied</span>
                <h3 className="font-headline-md text-primary">No Courts Found</h3>
                <p className="text-on-surface-variant mt-2">Try adjusting your filters or date selection.</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default CourtPage;
