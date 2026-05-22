import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { CancelBooking, createBookingCheckoutSession } from "../../api/api";
import { useUser } from "./UserContext";

export default function YourReservations() {
  const { userData, loading, setUserData } = useUser();
  const [checkingOutId, setCheckingOutId] = useState(null);
  const [cancelingId, setCancelingId] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.bookingCreated) {
      toast.success("Booking added to your reservations");
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    const checkoutStatus = searchParams.get("checkout");

    if (checkoutStatus === "success") {
      toast.success("Checkout completed");
    }

    if (checkoutStatus === "cancel") {
      toast.error("Checkout canceled");
    }
  }, [location.search, location.state]);

  if (loading) {
    return <div className="text-center p-4 text-primary">Loading...</div>;
  }

  const reservations = userData?.bookings || [];

  const handleCancel = async (id) => {
    try {
      setCancelingId(id);
      await CancelBooking(id);
      setUserData((currentUser) => ({
        ...currentUser,
        bookings: currentUser.bookings.filter((booking) => booking._id !== id),
      }));
      toast.error("Booking canceled");
    } catch (error) {
      toast.error("Could not cancel booking");
      console.error("Error in Cancel Booking", error);
    } finally {
      setCancelingId(null);
    }
  };

  const handleCheckout = async (id) => {
    try {
      setCheckingOutId(id);
      const data = await createBookingCheckoutSession(id);

      if (data.url) {
        window.location.assign(data.url);
      }
    } catch (error) {
      toast.error("Could not open Stripe checkout");
      console.error("Error in Booking Checkout", error);
      setCheckingOutId(null);
    }
  };

  return (
    <div className="w-full flex flex-col mt-8">
      <h1 className="font-headline-lg text-headline-lg text-primary mb-6">Your Bookings</h1>

      {reservations.length === 0 ? (
        <div className="col-span-full py-xl text-center glass-panel rounded-xl">
          <span className="material-symbols-outlined text-display-lg text-on-surface-variant mb-4 opacity-50 block">sentiment_dissatisfied</span>
          <h3 className="font-headline-md text-primary">No Bookings Found</h3>
          <p className="text-on-surface-variant mt-2">You don't have any reservations yet.</p>
        </div>
      ) : (
        <ul className="space-y-6">
          {reservations.map((reservation) => (
            <li
              key={reservation._id}
              className="glass-panel p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-md hover:bg-white/[0.02] transition-colors"
            >
              <div>
                <div className="flex items-center gap-sm mb-2">
                  <h3 className="text-xl font-headline-md text-primary">{reservation.courtName}</h3>
                  <span
                    className={`px-3 py-1 font-label-sm text-label-sm rounded-full ${
                      reservation.status === "confirmed"
                        ? "bg-primary-container/20 border border-primary-container text-primary-container"
                        : "bg-yellow-500/20 border border-yellow-500 text-yellow-500"
                    }`}
                  >
                    {reservation.status.toUpperCase()}
                  </span>
                </div>
                <div className="text-on-surface-variant font-body-md flex flex-col gap-1">
                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                    {new Date(reservation.date).toLocaleDateString("en-GB", { timeZone: "UTC" })}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">schedule</span>
                    {reservation.timeSlot.start} - {reservation.timeSlot.end}
                  </p>
                </div>
              </div>
              <div className="flex flex-row flex-wrap gap-3 mt-4 md:mt-0 w-full md:w-auto">
                <button
                  onClick={() => handleCancel(reservation._id)}
                  disabled={cancelingId === reservation._id || checkingOutId === reservation._id}
                  className="flex-1 md:flex-none px-4 py-2 font-label-md border border-error text-error rounded-md hover:bg-error hover:text-on-error transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cancelingId === reservation._id ? "Canceling..." : "Cancel"}
                </button>
                <button
                  onClick={() => handleCheckout(reservation._id)}
                  disabled={checkingOutId === reservation._id || cancelingId === reservation._id}
                  className="flex-1 md:flex-none px-4 py-2 font-label-md bg-primary-container text-on-primary-container rounded-md hover:scale-105 transition duration-200 neon-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {checkingOutId === reservation._id ? "Opening..." : "Go to checkout"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Toaster
        toastOptions={{
          style: {
            background: '#2a2a2a',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      />
    </div>
  );
}
