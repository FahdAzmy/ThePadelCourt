/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from "axios";
const API_URL = import.meta.env.VITE_APP_API_URL;

export default function CreateCourtModal({ open, isOpen, close }) {
  // State to hold form data
  const [courtData, setCourtData] = useState({
    name: "",
    location: "",
    startHour: "",
    endHour: "",
    pricePerHour: "",
    daysInAdvance: 30, // Default value
    courtImg: null, // Image file
  });

  // Handle form input changes
  const handleChange = (e) => {
    setCourtData({ ...courtData, [e.target.name]: e.target.value });
  };

  // Handle file input change for image
  const handleFileChange = (e) => {
    setCourtData({ ...courtData, courtImg: e.target.files[0] });
  };

  // API request to create a court
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append each field to the FormData object
    Object.keys(courtData).forEach((key) => {
      formData.append(key, courtData[key]);
    });

    console.log(courtData); // Check the current state
    console.log(formData); // Check the current state
    try {
      const response = await axios.post(`${API_URL}/createcourt`, courtData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);

      // Reset form after submission
      setCourtData({
        name: "",
        location: "",
        startHour: "",
        endHour: "",
        pricePerHour: "",
        daysInAdvance: 30,
        courtImg: null,
      });

      // Close modal after submission
      close();
    } catch (error) {
      console.error("Error creating court:", error);
    }
  };

  return (
    <>
      <Button
        onClick={open}
        className="w-48 rounded-md bg-blue-600 py-2 px-4 text-sm font-medium text-white focus:outline-none hover:bg-black/30"
      >
        Create Stadium
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-sm rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out">
              <h1 className="text-xl">Add A New Court</h1>
              <br />

              <DialogTitle className="space-y-4">
                {/* Court Name */}
                <label>Court Name</label>
                <input
                  className="w-full rounded-md h-11 p-3 border-2 shadow-md"
                  type="text"
                  name="name"
                  value={courtData.name}
                  onChange={handleChange}
                  placeholder="Enter court name"
                />

                {/* Location */}
                <label>Location</label>
                <input
                  className="w-full rounded-md h-11 p-3 border-2 shadow-md"
                  type="text"
                  name="location"
                  value={courtData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                />

                {/* Start Hour */}
                <label>Start Hour</label>
                <input
                  className="w-full rounded-md h-11 p-3 border-2 shadow-md"
                  type="time"
                  name="startHour"
                  value={courtData.startHour}
                  onChange={handleChange}
                />

                {/* End Hour */}
                <label>End Hour</label>
                <input
                  className="w-full rounded-md h-11 p-3 border-2 shadow-md"
                  type="time"
                  name="endHour"
                  value={courtData.endHour}
                  onChange={handleChange}
                />

                {/* Price Per Hour */}
                <label>Price Per Hour</label>
                <input
                  className="w-full rounded-md h-11 p-3 border-2 shadow-md"
                  type="number"
                  name="pricePerHour"
                  value={courtData.pricePerHour}
                  onChange={handleChange}
                  placeholder="Enter price per hour"
                />

                {/* Days in Advance */}
                <label>Days in Advance (optional)</label>
                <input
                  className="w-full rounded-md h-11 p-3 border-2 shadow-md"
                  type="number"
                  name="daysInAdvance"
                  value={courtData.daysInAdvance}
                  onChange={handleChange}
                  placeholder="Enter number of days"
                />

                {/* Court Image */}
                <label>Court Image</label>
                <input
                  className="w-full rounded-md  h-15 p-3 border-2 shadow-md"
                  type="file"
                  name="courtImg"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </DialogTitle>

              <div className="flex items-center my-3 space-x-2"></div>

              <div className="mt-4 flex space-x-3">
                <Button
                  className="w-full rounded-md bg-blue-600 py-1.5 px-3 text-sm font-semibold text-white shadow-inner focus:outline-none hover:bg-gray-600"
                  onClick={handleSubmit} // Handles both local state and request
                >
                  Submit
                </Button>
                <Button
                  className="w-full rounded-md bg-gray-500 py-1.5 px-3 text-sm font-semibold text-white shadow-inner focus:outline-none hover:bg-gray-600"
                  onClick={close}
                >
                  Cancel
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
