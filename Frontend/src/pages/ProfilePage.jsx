import { Outlet, useOutlet } from "react-router-dom";
import UserSidebar from "../components/UserProfile/UserSidebar";
import withGuard from "../utils/withGuard"; // Correct spelling
import { UserProvider } from "../components/UserProfile/UserContext";
function ProfilePage() {
  const outlet = useOutlet();

  return (
    <UserProvider>
      <div className="flex flex-col min-h-screen">
        <div className="py-5 my-5 ">
          <div className="flex flex-col md:flex-row mx-2 my-4">
            <div className="w-full md:w-1/4 px-2">
              <UserSidebar className="border rounded" />
            </div>
            {outlet && (
              <div className="w-full md:w-3/4 mx-4  max-md:my-2 max-md:mx-auto rounded  p-4">
                <Outlet />
              </div>
            )}
          </div>
        </div>
      </div>
    </UserProvider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export default withGuard(ProfilePage);
