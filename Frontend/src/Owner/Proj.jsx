/* eslint-disable react-refresh/only-export-components */
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import withGuard from "../utils/withGuard";
import CreateCourtModal from "./modul";
import Appp from "./app";

const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:4000/api";

const Proj = () => {
  const [starge, setStorge] = useState([]);
  const [courtToRemove, setCourtToRemove] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEditmModul, setIsOpenEditmModul] = useState(false);
  const [isOpenRemovemModul, setIsOpenremovemModul] = useState(false);
  const [editingCourt, setEditingCourt] = useState(null);
  const [isLoadingCourts, setIsLoadingCourts] = useState(true);

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

  const fetchCourts = useCallback(async () => {
    try {
      setIsLoadingCourts(true);
      const response = await axios.get(`${API_URL}/getcourtsofowner`, {
        withCredentials: true,
      });
      setStorge(response.data.courts);
    } catch (error) {
      console.error("Error fetching courts:", error);
      toast.error("Failed to fetch courts");
    } finally {
      setIsLoadingCourts(false);
    }
  }, []);

  useEffect(() => {
    fetchCourts();
  }, [fetchCourts]);

  const handleCourtCreated = useCallback((newCourt) => {
    if (!newCourt) {
      fetchCourts();
      return;
    }

    setStorge((currentCourts) => [newCourt, ...currentCourts]);
  }, [fetchCourts]);

  const deleteCourt = async (courtId) => {
    try {
      await axios.delete(`${API_URL}/deletecourt`, {
        data: { id: courtId },
        withCredentials: true,
      });
      setStorge((currentCourts) =>
        currentCourts.filter((court) => court._id !== courtId)
      );
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
      setStorge((currentCourts) =>
        currentCourts.map((court) =>
          court._id === editedData.id ? { ...court, ...editedData } : court
        )
      );
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

  // Mock data for dashboard
  const totalRevenue = useMemo(() => starge.length * 150, [starge.length]); // Just a mock stat based on courts

  return (
    <>
      <style>{`
        .neon-glow { box-shadow: 0 0 20px rgba(195, 244, 0, 0.2); }
        .neon-glow-active:active { box-shadow: 0 0 40px rgba(195, 244, 0, 0.4); }
        .glass-panel {
            background: rgba(42, 42, 42, 0.5);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .glass-row:hover { background: rgba(53, 53, 52, 0.6); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes growUp { from { height: 0; } to { height: var(--target-height); } }
        .bar-chart-bar { animation: growUp 1s ease-out forwards; }
      `}</style>

      <div className="bg-background text-on-surface font-body-md antialiased min-h-screen flex flex-col">
        {/* Main Content Canvas */}
        <main className="flex-grow pt-[100px] pb-[100px] md:pb-lg px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto w-full flex flex-col gap-lg">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-md">
            <div>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Owner Dashboard</h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Real-time performance metrics and court management.</p>
            </div>
            <div className="flex gap-sm">
              <div className="text-center">
                <CreateCourtModal open={open} isOpen={isOpen} close={close} onCreated={handleCourtCreated} />
              </div>
            </div>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Quick Stats (4 cols) */}
            <div className="md:col-span-4 flex flex-col gap-6">
              <div className="glass-panel rounded-lg p-md flex flex-col justify-between h-full min-h-[140px]">
                <div className="flex justify-between items-start">
                  <span className="font-label-md text-label-md text-on-surface-variant">Estimated Revenue</span>
                  <span className="material-symbols-outlined text-primary-container bg-primary-container/10 p-xs rounded-full">payments</span>
                </div>
                <div>
                  <div className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary">${totalRevenue}</div>
                  <div className="font-label-sm text-label-sm text-primary-container flex items-center gap-xs mt-xs">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span> Active tracking
                  </div>
                </div>
              </div>
              <div className="glass-panel rounded-lg p-md flex flex-col justify-between h-full min-h-[140px]">
                <div className="flex justify-between items-start">
                  <span className="font-label-md text-label-md text-on-surface-variant">Total Courts</span>
                  <span className="material-symbols-outlined text-primary p-xs rounded-full border border-white/15">sports_tennis</span>
                </div>
                <div>
                  <div className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary">{starge.length}</div>
                </div>
              </div>
            </div>

            {/* Main Chart area (8 cols) */}
            <div className="md:col-span-8 glass-panel rounded-lg p-md flex flex-col min-h-[300px]">
              <div className="flex justify-between items-center mb-md">
                <h2 className="font-headline-md text-headline-md text-primary">Revenue Overview Mockup</h2>
              </div>
              <div className="flex-grow flex items-end justify-between gap-xs md:gap-sm mt-md relative">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 z-0">
                  <div className="border-b border-white/20 w-full h-0"></div>
                  <div className="border-b border-white/20 w-full h-0"></div>
                  <div className="border-b border-white/20 w-full h-0"></div>
                  <div className="border-b border-white/20 w-full h-0"></div>
                </div>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                  const targetHeights = ['40%', '60%', '45%', '80%', '95%', '85%', '70%'];
                  return (
                    <div key={day} className="w-full flex flex-col justify-end items-center group z-10">
                      <div className="w-full max-w-[24px] bg-primary-container/80 rounded-t-sm bar-chart-bar hover:bg-primary-container transition-colors" style={{"--target-height": targetHeights[idx]}}></div>
                      <span className={`font-label-sm text-label-sm mt-sm ${idx === 4 ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>{day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Court Management Table (8 cols) */}
            <div className="md:col-span-8 flex flex-col gap-sm">
              <h2 className="font-headline-md text-headline-md text-primary mt-md">Live Court Status</h2>
              <div className="glass-panel rounded-lg overflow-hidden">
                <div className="grid grid-cols-4 gap-sm p-md border-b border-white/10 font-label-md text-label-md text-on-surface-variant">
                  <div>Court</div>
                  <div>Status</div>
                  <div className="hidden md:block">Price</div>
                  <div className="text-right">Action</div>
                </div>
                {isLoadingCourts ? (
                  <div className="p-8 text-center text-on-surface-variant">Loading courts...</div>
                ) : starge.length > 0 ? (
                  starge.map((court) => (
                    <Appp
                      key={court._id}
                      openRemove={() => openRemove(court._id)}
                      idx={court._id}
                      product={court}
                      setEtit={() => openEdit(court)}
                    />
                  ))
                ) : (
                   <div className="p-8 text-center text-on-surface-variant">No courts found. Create one to get started.</div>
                )}
              </div>
            </div>

            {/* Recent Activity Feed (4 cols) */}
            <div className="md:col-span-4 flex flex-col gap-sm">
              <h2 className="font-headline-md text-headline-md text-primary mt-md">Activity Feed</h2>
              <div className="glass-panel rounded-lg p-md flex flex-col gap-md h-[340px] overflow-y-auto no-scrollbar">
                <div className="flex gap-md items-start relative">
                  <div className="absolute left-[15px] top-8 bottom-[-24px] w-[1px] bg-white/10 z-0"></div>
                  <div className="w-8 h-8 rounded-full bg-primary-container/20 border border-primary-container/50 flex items-center justify-center z-10 shrink-0 shadow-[0_0_10px_rgba(195,244,0,0.2)]">
                    <span className="material-symbols-outlined text-[16px] text-primary-container">check</span>
                  </div>
                  <div>
                    <div className="font-body-md text-body-md text-primary">System Online</div>
                    <div className="font-label-sm text-label-sm text-on-surface-variant mt-xs">Dashboard loaded successfully.</div>
                    <div className="font-label-sm text-label-sm text-primary/50 mt-xs text-[10px]">Just now</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Edit Modal Custom Dark Theme Override */}
        <Dialog open={isOpenEditmModul} onClose={closeEdit} className="relative z-[100]">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-lg rounded-xl glass-panel p-6 shadow-lg border border-white/15">
              <DialogTitle className="text-2xl font-headline-md text-primary mb-6">Edit Court</DialogTitle>
              <form onSubmit={handleEditSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Name</label>
                  <input type="text" name="name" defaultValue={editingCourt?.name} className="block w-full rounded-md h-10 bg-surface-container/50 border border-white/10 text-primary px-3 focus:outline-none focus:border-primary-container" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Location</label>
                  <input type="text" name="location" defaultValue={editingCourt?.location} className="block w-full rounded-md h-10 bg-surface-container/50 border border-white/10 text-primary px-3 focus:outline-none focus:border-primary-container" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Price Per Hour ($)</label>
                  <input type="number" name="pricePerHour" defaultValue={editingCourt?.pricePerHour} className="block w-full rounded-md h-10 bg-surface-container/50 border border-white/10 text-primary px-3 focus:outline-none focus:border-primary-container" />
                </div>
                <div className="mt-8 flex justify-end space-x-3">
                  <Button type="submit" className="rounded-md bg-primary-container px-4 py-2 text-sm font-bold text-on-primary-container hover:scale-105 transition-transform neon-glow">Save Changes</Button>
                  <Button type="button" className="rounded-md border border-white/20 bg-transparent px-4 py-2 text-sm font-medium text-primary hover:bg-white/5 transition-colors" onClick={closeEdit}>Cancel</Button>
                </div>
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Remove Modal Custom Dark Theme Override */}
        <Dialog open={isOpenRemovemModul} onClose={closeRemove} className="relative z-[100]">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="w-full max-w-sm rounded-xl glass-panel p-6 shadow-lg border border-error/30">
              <DialogTitle className="text-xl font-headline-md text-error mb-2">Confirm Deletion</DialogTitle>
              <p className="text-sm text-on-surface-variant mb-6">Are you sure you want to remove this court? This action cannot be undone.</p>
              <div className="flex justify-end space-x-3">
                <Button type="button" className="rounded-md bg-error px-4 py-2 text-sm font-bold text-on-error hover:scale-105 transition-transform shadow-[0_0_15px_rgba(255,180,171,0.4)]" onClick={() => { deleteCourt(courtToRemove); closeRemove(); }}>Yes, Remove</Button>
                <Button type="button" className="rounded-md border border-white/20 bg-transparent px-4 py-2 text-sm font-medium text-primary hover:bg-white/5 transition-colors" onClick={closeRemove}>Cancel</Button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </div>
      <Toaster toastOptions={{ style: { background: '#2a2a2a', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)' } }} />
    </>
  );
};

export default withGuard(Proj);
