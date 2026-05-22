import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function CourtCart({ court }) {
  const navigate = useNavigate();

  const handleBookNow = async (e) => {
    e.stopPropagation();
    
    // Check if court has availability
    if (!court.availability || court.availability.length === 0 || court.availability[0].timeSlots.length === 0) {
      alert("This court is currently not available.");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Pick the first available date and timeslot
    const date = court.availability[0].date;
    const timeSlot = court.availability[0].timeSlots[0];

    try {
      await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/createbooking`,
        {
          courtId: court._id,
          date,
          timeSlot
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      alert("Booking created successfully!");
    } catch (error) {
      console.error("Booking error:", error);
      alert(error.response?.data?.message || "Failed to create booking.");
    }
  };

  return (
    <div 
      className="min-w-[300px] md:min-w-[400px] flex-shrink-0 snap-start glass-panel rounded-xl overflow-hidden group cursor-pointer hover:border-primary-container transition-colors duration-300"
      onClick={() => navigate(`/court/${court._id}`)}
    >
      <div className="h-48 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10"></div>
        <img 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          src={court.courtImg?.url || "https://lh3.googleusercontent.com/aida-public/AB6AXuCQ9gvrytbJLjaKUDDAvAJa1d7q6gLKhB96xuB9UMYQ5dGKHbkcpbiqsSXD6TjS3x1Dw5nNSoPMU65Tnw-LkXRW2yH9DfFcEGzt__fCQgVZRm4ZvBPKTAAbyAAnj517wWUIsm0vuN3kTDsq1vgXBa9rMdnxzhtk9a7a6lGZFR8Dk35Uwx04q82hjuVBimj5uV-oHGvNkzaWYfLw9qo5R0IAx3TNvE9yi6qOl5L68m8FMJiMo-_Kcz5yD9QBKzVE7ZkZYwAwZRKH2zY"} 
          alt={court.name} 
        />
        <div className="absolute top-sm right-sm z-20 bg-primary-container text-on-primary-container px-sm py-xs rounded-full font-label-sm text-label-sm shadow-[0_0_15px_rgba(195,244,0,0.4)] flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-background animate-pulse"></span> Available Now
        </div>
      </div>
      <div className="p-md relative z-20 -mt-10">
        <h3 className="font-headline-md text-headline-md text-primary mb-xs">{court.name}</h3>
        <div className="flex justify-between items-center text-on-surface-variant font-label-sm text-label-sm mb-md">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-primary-container">star</span> 
            4.9 (120 reviews)
          </span>
          <span className="line-clamp-1 text-right ml-2">{court.location}</span>
        </div>
        <div className="flex justify-between items-center mt-sm pt-sm border-t border-white/10">
          <span className="font-headline-md text-headline-md text-primary">
            ${court.pricePerHour} <span className="font-label-sm text-label-sm text-on-surface-variant">/ hr</span>
          </span>
          <button 
            className="bg-surface-variant hover:bg-primary-container hover:text-on-primary-container text-primary w-10 h-10 rounded-full flex items-center justify-center transition-colors"
            onClick={handleBookNow}
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
