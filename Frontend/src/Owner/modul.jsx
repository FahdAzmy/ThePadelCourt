/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:4000/api";

const initialCourtData = {
  name: "",
  location: "",
  startHour: "",
  endHour: "",
  pricePerHour: "",
  daysInAdvance: 30,
  courtImg: null,
};

export default function CreateCourtModal({ open, isOpen, close, onCreated }) {
  const [courtData, setCourtData] = useState(initialCourtData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourtData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setCourtData((currentData) => ({
      ...currentData,
      courtImg: e.target.files?.[0] || null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!courtData.courtImg) {
      toast.error("Please choose a court image");
      return;
    }

    const formData = new FormData();
    Object.keys(courtData).forEach((key) => {
      if (courtData[key] !== null && courtData[key] !== "") {
        formData.append(key, courtData[key]);
      }
    });

    try {
      setIsSubmitting(true);
      const response = await axios.post(`${API_URL}/createcourt`, formData, {
        withCredentials: true,
      });
      toast.success("Stadium created successfully");
      onCreated?.(response.data.newCourt);
      setCourtData(initialCourtData);
      close();
    } catch (error) {
      console.error("Error creating court:", error);
      toast.error(error.response?.data?.Message || "Failed to create stadium");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        onClick={open}
        className="bg-primary-container text-on-primary px-md py-base rounded-full font-label-md text-label-md font-bold neon-glow transition-all flex items-center gap-xs hover:scale-105 active:scale-95"
      >
        <span className="material-symbols-outlined text-[18px]">add</span>
        Create Stadium
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-[100] focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/80 backdrop-blur-sm">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="w-full max-w-lg rounded-xl glass-panel p-6 shadow-lg border border-white/15 duration-300 ease-out">
              <DialogTitle className="text-2xl font-headline-md text-primary mb-6">Add A New Court</DialogTitle>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Court Name</label>
                  <input
                    className="block w-full rounded-md h-10 bg-surface-container/50 border border-white/10 text-primary px-3 focus:outline-none focus:border-primary-container"
                    type="text"
                    name="name"
                    value={courtData.name}
                    onChange={handleChange}
                    placeholder="Enter court name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Location</label>
                  <input
                    className="block w-full rounded-md h-10 bg-surface-container/50 border border-white/10 text-primary px-3 focus:outline-none focus:border-primary-container"
                    type="text"
                    name="location"
                    value={courtData.location}
                    onChange={handleChange}
                    placeholder="Enter location"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1">Start Hour</label>
                    <input
                      className="block w-full rounded-md h-10 bg-surface-container/50 border border-white/10 text-primary px-3 focus:outline-none focus:border-primary-container [color-scheme:dark]"
                      type="time"
                      name="startHour"
                      value={courtData.startHour}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-1">End Hour</label>
                    <input
                      className="block w-full rounded-md h-10 bg-surface-container/50 border border-white/10 text-primary px-3 focus:outline-none focus:border-primary-container [color-scheme:dark]"
                      type="time"
                      name="endHour"
                      value={courtData.endHour}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Price Per Hour ($)</label>
                  <input
                    className="block w-full rounded-md h-10 bg-surface-container/50 border border-white/10 text-primary px-3 focus:outline-none focus:border-primary-container"
                    type="number"
                    name="pricePerHour"
                    value={courtData.pricePerHour}
                    onChange={handleChange}
                    placeholder="Enter price per hour"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Days in Advance (optional)</label>
                  <input
                    className="block w-full rounded-md h-10 bg-surface-container/50 border border-white/10 text-primary px-3 focus:outline-none focus:border-primary-container"
                    type="number"
                    name="daysInAdvance"
                    value={courtData.daysInAdvance}
                    onChange={handleChange}
                    placeholder="Enter number of days"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Court Image</label>
                  <input
                    className="block w-full rounded-md bg-surface-container/50 border border-white/10 text-primary px-3 py-2 focus:outline-none focus:border-primary-container file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-container file:text-on-primary-container hover:file:bg-primary-fixed-dim transition-all"
                    type="file"
                    name="courtImg"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                  />
                </div>

                <div className="mt-8 flex justify-end space-x-3">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-md bg-primary-container px-4 py-2 text-sm font-bold text-on-primary-container hover:scale-105 transition-transform neon-glow disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Creating..." : "Submit"}
                  </Button>
                  <Button
                    type="button"
                    disabled={isSubmitting}
                    className="rounded-md border border-white/20 bg-transparent px-4 py-2 text-sm font-medium text-primary hover:bg-white/5 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    onClick={close}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
