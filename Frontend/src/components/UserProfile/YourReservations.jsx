/* eslint-disable react/no-unescaped-entities */
import toast, { Toaster } from "react-hot-toast";
import { CancelBooking, ConfirmBooking } from "../../api/api";
import { useUser } from "./UserContext"; // Adjust the import path as needed

export default function YourReservations() {
  const { userData, loading } = useUser();

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  const reservations = userData.bookings || [];

  const handleConfirm = async (id) => {
    try {
      await ConfirmBooking(id);
      //alert("Booking Confirmed");
      toast.success("Booking Confirmed");

    } catch (error) {
      console.error("Error in Deleting Booking", error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await CancelBooking(id);
      toast.error("Booking canceled");

      //alert("Booking canceled");
    } catch (error) {
      console.error("Error in Deleting Booking", error);
    }
  };

  return (
    <div className="max-w-4xl overflow-auto    flex flex-col h-screen mx-20 p-4">
      <br/><br/>
      <h1 className="text-3xl font-bold mb-6 text-center">Your Reservations</h1>
      {reservations.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          You don't have any reservations yet.
        </p>
      ) : (
        <ul className="space-y-6">
          {reservations.map((reservation) => (
            <li
              key={reservation._id}
              className="border p-6 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl  font-bold">{reservation.courtName}</h3>
                <span
                  className={`px-3 py-1 font-semibold rounded-full text-white ${
                    reservation.status === "confirmed"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                >
                  {reservation.status}
                </span>
              </div>
              <div className="text-gray-600">
                <p className="font-bold">
                  Date: Date:{" "}
                  {new Date(reservation.date).toLocaleDateString("en-GB", {
                    timeZone: "UTC",
                  })}
                </p>

                <p className="mb-2">
                  <span className="font-semibold">Check-in:</span>{" "}
                  {reservation.timeSlot.start}
                </p>
                <p className="mb-4">
                  <span className="font-semibold">Check-out:</span>{" "}
                  {reservation.timeSlot.end}
                </p>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => handleConfirm(reservation._id)}
                  className="px-4 py-2 font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleCancel(reservation._id)}
                  className="px-4 py-2 font-semibold bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Toaster />
      </div>
  );
}
