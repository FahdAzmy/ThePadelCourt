import { NavLink } from "react-router-dom";
import {
  UserCircleIcon,
  TicketIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

export default function UserSidebar() {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <NavLink
        to=""
        className={() =>
          `flex items-center font-bold p-2 rounded-lg hover:bg-gray-100 
            
          }`
        }
      >
        <UserCircleIcon className="w-8 h-8 mr-2" />
        <span>Account Settings</span>
      </NavLink>
      <NavLink
        to="changepassword"
        className={({ isActive }) =>
          `flex items-center p-2 font-bold rounded-lg hover:bg-gray-100 ${
            isActive ? "bg-gray-200" : ""
          }`
        }
      >
        <EyeIcon className="w-8 h-8 mr-2" />
        <span>Change Password</span>
      </NavLink>
      <NavLink
        to="reservations"
        className={({ isActive }) =>
          `flex items-center p-2 font-bold rounded-lg hover:bg-gray-100 ${
            isActive ? "bg-gray-200" : ""
          }`
        }
      >
        <TicketIcon className="w-8 h-8 mr-2" />
        <span>Your Reservations</span>
      </NavLink>
    </div>
  );
}
