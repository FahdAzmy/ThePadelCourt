import { useState } from "react";

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

    try {
      // Assuming you have an API endpoint to check the old password
      const response = await fetch("/api/check-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ oldPassword: oldPasswordInput }),
      });

      const result = await response.json();

      if (!result.match) {
        // If the old password does not match, show an error
        setErrorMessage("Old password is incorrect");
        return;
      }

      // If the password matches, proceed to change the password
      await fetch("/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: newPasswordInput }),
      });

      setErrorMessage(""); // Clear error on success
      alert("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      setErrorMessage("There was an error processing your request.");
    }
  };

  return (
    <div className="max-w-md mx-auto py-6">
      <h1 className="text-2xl text-center mb-4 font-semibold">
        Change Password
      </h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="oldpassword"
            className="block text-sm font-medium text-gray-700"
          >
            Old Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500 focus:border-blue-500"
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
            className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
