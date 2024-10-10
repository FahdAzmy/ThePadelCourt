import { Outlet, useOutlet } from "react-router-dom";
import UserSidebar from "../components/UserProfile/UserSidebar";

function ProfilePage() {
  const outlet = useOutlet();

  return (
    <div className="h-screen">
      <div className="py-5 my-5">
        <div className="flex flex-col md:flex-row mx-2 my-4">
          <div className="w-full md:w-1/4 px-2">
            <UserSidebar className="border rounded" />
          </div>
          {outlet && (
            <div className="w-full md:w-3/4 mx-4 border rounded h-full p-4">
              <Outlet />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
