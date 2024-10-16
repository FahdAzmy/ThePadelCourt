/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Page from "./ownerPage";
import withGuard from "../utils/withGuard";
import CreateCourtModal from "./modul";
import Appp from "./app";

const API_URL = import.meta.env.VITE_APP_API_URL;

const Proj = () => {
  const [starge, setStorge] = useState([]);
  const [courtToRemove, setCourtToRemove] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditmModul, setIsOpenEditmModul] = useState(false);
  const [isOpenRemovemModul, setIsOpenremovemModul] = useState(false);
  const [editingCourt, setEditingCourt] = useState(null);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const openEdit = (court) => {
    setEditingCourt(court);
    setIsOpenEditmModul(true);
  };
  const closeEdit = () => {
    setEditingCourt(null);
    setIsOpenEditmModul(false);
  };

  const openRemove = (courtId) => {
    setCourtToRemove(courtId);
    setIsOpenremovemModul(true);
  };
  const closeRemove = () => setIsOpenremovemModul(false);

  const fetchCourts = async () => {
    try {
      const response = await axios.get(`${API_URL}/getcourtsofowner`, {
        withCredentials: true,
      });
      setStorge(response.data.courts);
    } catch (error) {
      console.error("Error fetching courts:", error);
      toast.error("Failed to fetch courts");
    }
  };

  useEffect(() => {
    fetchCourts();
  }, [starge]);

  const deleteCourt = async (courtId) => {
    try {
      await axios.delete(`${API_URL}/deletecourt`, {
        data: { id: courtId },
        withCredentials: true,
      });
      await fetchCourts();
      toast.success("Court deleted successfully");
    } catch (error) {
      console.error("Error deleting court:", error);
      toast.error("Failed to delete court");
    }
  };

  const editCourt = async (editedData) => {
    try {
      await axios.put(`${API_URL}/updatecourt`, editedData, {
        withCredentials: true,
      });
      await fetchCourts();
      toast.success("Court updated successfully");
      closeEdit();
    } catch (error) {
      console.error("Error updating court:", error);
      toast.error("Failed to update court");
    }
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const editedData = Object.fromEntries(formData.entries());
    editedData.id = editingCourt._id;
    editCourt(editedData);
  };

  return (
    <>
      <Page />
      <br />
      <div className="text-center">
        <CreateCourtModal open={open} isOpen={isOpen} close={close} />
      </div>
      <br />
      <div className="w-auto ml-20 max-md:flex max-md:justify-center max-md:flex-col max-md:items-center max-md:my-2 max-md:mx-auto container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {starge.map((court) => (
          <Appp
            key={court._id}
            openRemove={() => openRemove(court._id)}
            idx={court._id}
            product={court}
            setEtit={() => openEdit(court)}
          />
        ))}
      </div>

 {/* Edit Modal */}
<Dialog
  open={isOpenEditmModul}
  onClose={closeEdit}
  className="relative z-10"
>
  <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
  <div className="fixed inset-0 flex items-center justify-center p-4">
    <Dialog.Panel className="w-full max-w-lg h-auto rounded-lg bg-white p-6 shadow-lg">
      <Dialog.Title className="text-2xl font-semibold text-gray-800 mb-4">
        Edit Court
      </Dialog.Title>
      <form onSubmit={handleEditSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium  text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={editingCourt?.name}
            className="mt-1 block pl-3 w-full  rounded-md h-10 border-gray-300 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            defaultValue={editingCourt?.location}
            className="mt-1 block pl-3 w-full rounded-md h-10 border-gray-300 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Price Per Hour
          </label>
          <input
            type="number"
            name="pricePerHour"
            defaultValue={editingCourt?.pricePerHour}
            className="mt-1 pl-3 block w-full rounded-md h-10 border-gray-300 shadow-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <Button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          >
            Save Changes
          </Button>
          <Button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
            onClick={closeEdit}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Dialog.Panel>
  </div>
</Dialog>


      {/* Remove Modal */}
      <Dialog
        open={isOpenRemovemModul}
        onClose={closeRemove}
        className="relative z-10"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full  h-auto max-w-sm rounded bg-white p-6">
            <DialogTitle className="text-lg font-medium leading-6 text-gray-900">
              Confirm Deletion
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to remove this court? This action cannot
                be undone.
              </p>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                onClick={() => {
                  deleteCourt(courtToRemove);
                  closeRemove();
                }}
              >
                Yes, Remove
              </Button>
              <Button
                type="button"
                className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                onClick={closeRemove}
              >
                Cancel
              </Button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <Toaster />
    </>
  );
};

export default withGuard(Proj);
