import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="container-fluid py-3">
      <h1 className="text-center mb-4">Change Password</h1>
      <form className="row g-3 justify-content-center" onSubmit={handleSubmit}>
        <div className="col-12 col-md-6">
          <label htmlFor="oldpass" className="form-label">
            Old Password <span className="text-danger">*</span>
          </label>
          <input
            type="password"
            className="form-control"
            id="oldpassword"
            name="password"
            value={oldPasswordInput}
            onChange={handleOldPasswordChange}
          />
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="newpass" className="form-label">
            New Password <span className="text-danger">*</span>
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={newPasswordInput}
            onChange={handleNewPasswordChange}
          />
        </div>
        {errorMessage && (
          <div className="col-12 text-center mt-2">
            <span className="text-danger">{errorMessage}</span>
          </div>
        )}
      </form>
      <div className="col-12 text-center mt-4">
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  );
}
