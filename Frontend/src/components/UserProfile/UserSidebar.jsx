import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../Logo";

export default function UserSidebar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
     localStorage.removeItem('token');
     navigate('/login');
  };

  return (
    <>
      {/* Left Sidebar (Desktop Nav) */}
      <aside className="hidden md:flex flex-col w-24 border-r border-white/10 bg-surface-container-lowest/80 backdrop-blur-2xl z-40 h-full py-xl items-center justify-between">
        <div className="flex flex-col items-center gap-xl">
          {/* Brand Mark */}
          <div className="cursor-pointer hover:scale-105 transition-transform">
             <Logo width={60} height={60} className="drop-shadow-[0_0_15px_rgba(195,244,0,0.6)]" />
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-lg mt-lg">
            {/* Account Settings */}
            <NavLink to="" end className={({isActive}) => `flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 group relative cursor-pointer active:scale-95 ${isActive ? 'text-primary-container drop-shadow-[0_0_8px_rgba(195,244,0,0.6)]' : 'text-on-surface-variant hover:text-primary'}`}>
              {({isActive}) => (
                <>
                  {isActive && <div className="absolute inset-0 bg-primary-container/10 blur-md rounded-full"></div>}
                  <span className="material-symbols-outlined text-[28px] mb-xs relative z-10" style={isActive ? {fontVariationSettings: "'FILL' 1"} : {}}>person</span>
                  <span className={`font-label-sm text-label-sm absolute -bottom-6 ${isActive ? 'text-primary-container' : 'opacity-0 group-hover:opacity-100 transition-opacity'}`}>Profile</span>
                </>
              )}
            </NavLink>

            {/* Reservations */}
            <NavLink to="reservations" className={({isActive}) => `flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 group relative cursor-pointer active:scale-95 ${isActive ? 'text-primary-container drop-shadow-[0_0_8px_rgba(195,244,0,0.6)]' : 'text-on-surface-variant hover:text-primary'}`}>
              {({isActive}) => (
                <>
                  {isActive && <div className="absolute inset-0 bg-primary-container/10 blur-md rounded-full"></div>}
                  <span className="material-symbols-outlined text-[28px] mb-xs relative z-10" style={isActive ? {fontVariationSettings: "'FILL' 1"} : {}}>event_available</span>
                  <span className={`font-label-sm text-label-sm absolute -bottom-6 ${isActive ? 'text-primary-container' : 'opacity-0 group-hover:opacity-100 transition-opacity'}`}>Bookings</span>
                </>
              )}
            </NavLink>
            
            {/* Change Password */}
            <NavLink to="changepassword" className={({isActive}) => `flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 group relative cursor-pointer active:scale-95 ${isActive ? 'text-primary-container drop-shadow-[0_0_8px_rgba(195,244,0,0.6)]' : 'text-on-surface-variant hover:text-primary'}`}>
              {({isActive}) => (
                <>
                  {isActive && <div className="absolute inset-0 bg-primary-container/10 blur-md rounded-full"></div>}
                  <span className="material-symbols-outlined text-[28px] mb-xs relative z-10" style={isActive ? {fontVariationSettings: "'FILL' 1"} : {}}>key</span>
                  <span className={`font-label-sm text-label-sm absolute -bottom-6 ${isActive ? 'text-primary-container' : 'opacity-0 group-hover:opacity-100 transition-opacity'}`}>Security</span>
                </>
              )}
            </NavLink>
          </nav>
        </div>
        <button onClick={handleLogout} className="text-on-surface-variant hover:text-error transition-colors">
          <span className="material-symbols-outlined">logout</span>
        </button>
      </aside>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="flex md:hidden justify-around items-center h-20 pb-safe px-gutter fixed bottom-0 left-0 right-0 w-full z-50 rounded-t-lg bg-background/90 backdrop-blur-2xl border-t border-white/15 shadow-[0_-4px_24px_rgba(0,0,0,0.5)]">
         {/* Account Settings */}
         <NavLink to="" end className={({isActive}) => `flex flex-col items-center justify-center transition-transform active:scale-90 ${isActive ? 'text-primary drop-shadow-[0_0_8px_rgba(171,214,0,0.6)]' : 'text-on-surface-variant opacity-60 hover:opacity-100'}`}>
            {({isActive}) => (
               <>
                 <span className={`material-symbols-outlined ${isActive ? 'text-primary-container' : ''}`} style={isActive ? {fontVariationSettings: "'FILL' 1"} : {}}>person</span>
                 <span className={`font-label-sm text-label-sm mt-1 ${isActive ? 'text-primary-container' : ''}`}>Profile</span>
               </>
            )}
         </NavLink>
         {/* Reservations */}
         <NavLink to="reservations" className={({isActive}) => `flex flex-col items-center justify-center transition-transform active:scale-90 ${isActive ? 'text-primary drop-shadow-[0_0_8px_rgba(171,214,0,0.6)]' : 'text-on-surface-variant opacity-60 hover:opacity-100'}`}>
            {({isActive}) => (
               <>
                 <span className={`material-symbols-outlined ${isActive ? 'text-primary-container' : ''}`} style={isActive ? {fontVariationSettings: "'FILL' 1"} : {}}>event_available</span>
                 <span className={`font-label-sm text-label-sm mt-1 ${isActive ? 'text-primary-container' : ''}`}>Bookings</span>
               </>
            )}
         </NavLink>
         {/* Change Password */}
         <NavLink to="changepassword" className={({isActive}) => `flex flex-col items-center justify-center transition-transform active:scale-90 ${isActive ? 'text-primary drop-shadow-[0_0_8px_rgba(171,214,0,0.6)]' : 'text-on-surface-variant opacity-60 hover:opacity-100'}`}>
            {({isActive}) => (
               <>
                 <span className={`material-symbols-outlined ${isActive ? 'text-primary-container' : ''}`} style={isActive ? {fontVariationSettings: "'FILL' 1"} : {}}>key</span>
                 <span className={`font-label-sm text-label-sm mt-1 ${isActive ? 'text-primary-container' : ''}`}>Security</span>
               </>
            )}
         </NavLink>
      </nav>
    </>
  );
}
