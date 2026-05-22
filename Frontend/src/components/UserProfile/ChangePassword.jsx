import { useState } from "react";
import { changePassaword } from "../../api/api";

export default function ChangePassword() {
  const [oldPasswordInput, setOldPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await changePassaword({
        oldPassword: oldPasswordInput,
        newPassword: newPasswordInput,
      });
      setSuccessMessage("Password changed successfully!");
      setOldPasswordInput("");
      setNewPasswordInput("");
    } catch (error) {
      console.error("Error changing password:", error);
      setErrorMessage(
        error.response?.data?.message || "There was an error processing your request."
      );
    }
  };

  return (
    <div className="w-full flex flex-col mt-8 max-w-2xl">
      <h1 className="font-headline-lg text-headline-lg text-primary mb-6">Security Settings</h1>
      
      <div className="glass-panel p-8 rounded-xl">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
             Current Password <span className="text-error">*</span>
            </label>
            <div className="relative">
               <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">lock</span>
               </span>
               <input
                 type="password"
                 className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-primary focus:outline-none focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed transition-all"
                 value={oldPasswordInput}
                 onChange={(e) => setOldPasswordInput(e.target.value)}
                 required
               />
            </div>
          </div>
          
          <div>
            <label className="block font-label-md text-label-md text-on-surface-variant mb-2">
              New Password <span className="text-error">*</span>
            </label>
            <div className="relative">
               <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-on-surface-variant">
                  <span className="material-symbols-outlined text-[18px]">key</span>
               </span>
               <input
                 type="password"
                 className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-primary focus:outline-none focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed transition-all"
                 value={newPasswordInput}
                 onChange={(e) => setNewPasswordInput(e.target.value)}
                 required
               />
            </div>
          </div>

          {errorMessage && (
            <div className="bg-error/10 border border-error/50 text-error p-3 rounded-lg font-body-md text-center">
              {errorMessage}
            </div>
          )}
          {successMessage && (
            <div className="bg-primary-container/10 border border-primary-container/50 text-primary-container p-3 rounded-lg font-body-md text-center">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-primary-container text-on-primary-container font-label-md rounded-lg hover:scale-105 transition-all duration-300 neon-glow flex items-center justify-center gap-2"
          >
            Update Password
            <span className="material-symbols-outlined text-[18px]">save</span>
          </button>
        </form>
      </div>
    </div>
  );
}
