import { useState } from "react";
import { changePassaword } from "../../api/api";

export default function ChangePassword() {
  const [oldPasswordInput, setOldPasswordInput] = useState("");
  const [newPasswordInput, setNewPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleOldPasswordChange = (e) => {
    setOldPasswordInput(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPasswordInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors
    try {
      await changePassaword({
        oldPassword: oldPasswordInput,
        newPassword: newPasswordInput,
      });
      alert("Password changed successfully!");
      // Clear inputs after successful change
      setOldPasswordInput("");
      setNewPasswordInput("");
    } catch (error) {
      console.error("Error changing password:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "There was an error processing your request."
      );
    }
  };

  return (
    <div className="max-w-2xl mx-36 p-6 w-full">
      <br/><br/>
      <h1 className="text-2xl text-center mb-4 font-semibold">
        Change Password
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="oldpassword"
            className="block text-sm font-medium text-gray-700"
          >
           Old Password  <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className="mt-1 py-1 px-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
            id="oldpassword"
            value={oldPasswordInput}
            onChange={handleOldPasswordChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="newpassword"
            className="block text-sm font-medium text-gray-700"
          >
            New Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className="mt-1 py-1 px-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
            id="newpassword"
            value={newPasswordInput}
            onChange={handleNewPasswordChange}
            required
          />
        </div>
        {errorMessage && (
          <div className="text-center mt-2">
            <span className="text-red-500">{errorMessage}</span>
          </div>
        )}
        <div className="text-center">
          <button
            type="submit"
            className="w-full max-w-44 mt-4 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
