import React from "react";
import { Outlet, useOutlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import UserSidebar from "../components/UserProfile/UserSidebar";

function ProfilePage() {
  const outlet = useOutlet();

  return (
    <div className=" h-screen">
      <div className="container-fluid py-5  my-5">
        <div className="row my-4 mx-2 py-4 px-2 g-4">
          <div className="col-12 col-sm-4 col-md-3 col-lg-3 px-2 ">
            <UserSidebar className="border rounded"/>
          </div>
          {outlet && (
            <div className="col-12 col-sm-8 col-md-7 col-lg-8 mx-4 border rounded h-100 p-4">
              <Outlet />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
