import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserSidebar from "../components/UserProfile/UserSidebar";
import "./ProfilePage.css";

function ProfilePage() {
  const location = useLocation();

  return (
    <div className="">
      <div
        className="container-fluid position-relative overflow-hidden mb-4 "
        style={{ maxHeight: "250px" }}
      >
        <img
          className="w-100 object-fit-cover"
          src="/Padel club.png"
          alt="Padel club background"
          style={{ maxHeight: "300px" }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-success opacity-50"></div>
        <div className="position-absolute top-50 start-50 translate-middle text-center">
          <h1 className="text-white fw-bold fs-1">My Profile</h1>
        </div>
      </div>
      {/* <div className="hero">
        <div className="container justify-content-center">
          <h1 className="text-white fw-bold fs-1">My Profile</h1>
        </div>
      </div> */}
      <div className="container-fluid p-0  my-5">
        <div className="row justify-content-center g-4">
          <div className="col-12 col-sm-4 col-md-3 col-lg-3 px-2">
            <UserSidebar className="border rounded" />
          </div>
          <div className="col-12 col-sm-8 col-md-7 col-lg-8 border rounded h-100 p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
