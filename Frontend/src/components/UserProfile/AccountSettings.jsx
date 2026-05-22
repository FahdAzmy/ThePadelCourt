import { useUser } from "./UserContext";
import { Link } from "react-router-dom";

export default function AccountSettings() {
  const { userData, loading } = useUser();

  if (loading || !userData) {
    return <div className="text-primary p-6 text-center">Loading profile...</div>;
  }

  // Calculate some dummy stats for visual flair based on bookings length if possible
  const totalGames = userData.bookings ? userData.bookings.length : 12;

  return (
    <>
      {/* Profile Section */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-lg mt-8">
        <div className="relative group cursor-pointer">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-primary-container p-1 neon-glow-intense transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full rounded-full overflow-hidden bg-surface-container flex items-center justify-center relative">
              <span className="material-symbols-outlined text-6xl text-primary/50">person</span>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-sm">
                <span className="material-symbols-outlined text-primary">photo_camera</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left pt-md">
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight">{userData.name}</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs mb-md">{userData.email}</p>
          <div className="flex gap-sm">
            <span className="px-sm py-xs rounded-full glass-panel border-primary-container/50 text-primary-container font-label-md text-label-md flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
              {userData.role === 'admin' ? 'Admin Tier' : 'Pro Tier'}
            </span>
            <Link to="changepassword" className="px-sm py-xs rounded-full glass-panel text-primary font-label-md text-label-md hover:bg-white/5 transition-colors flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px]">edit</span>
              Security
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Grid (Bento Box) */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
        {/* Total Games */}
        <div className="col-span-2 md:col-span-1 glass-panel rounded-xl p-md flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
          <div className="flex items-center gap-sm text-on-surface-variant mb-lg">
            <span className="material-symbols-outlined">sports_tennis</span>
            <h3 className="font-label-md text-label-md uppercase tracking-widest">Total Games</h3>
          </div>
          <div>
            <p className="font-display-lg text-display-lg text-primary text-neon-glow">{totalGames}</p>
          </div>
        </div>
        {/* Win Rate */}
        <div className="col-span-2 md:col-span-1 glass-panel rounded-xl p-md flex flex-col justify-between hover:bg-white/[0.02] transition-colors relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-primary-container/10 rounded-full blur-2xl"></div>
          <div className="flex items-center gap-sm text-on-surface-variant mb-lg relative z-10">
            <span className="material-symbols-outlined">military_tech</span>
            <h3 className="font-label-md text-label-md uppercase tracking-widest">Win Rate</h3>
          </div>
          <div className="relative z-10">
            <p className="font-display-lg text-display-lg text-primary">85<span className="text-headline-md text-on-surface-variant">%</span></p>
            <div className="w-full h-2 bg-surface-container-highest rounded-full mt-sm overflow-hidden">
              <div className="h-full bg-primary-container rounded-full w-[85%] neon-glow"></div>
            </div>
          </div>
        </div>
        
        {/* Next Booking */}
        <div className="col-span-2 md:col-span-2 glass-panel rounded-xl p-md flex flex-col justify-between border-l-2 border-l-primary-container relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary-container/5 to-transparent z-0"></div>
          <div className="flex justify-between items-start relative z-10">
            <div className="flex items-center gap-sm text-primary-container mb-md">
              <span className="material-symbols-outlined animate-pulse">check_circle</span>
              <h3 className="font-label-md text-label-md uppercase tracking-widest text-primary-container text-neon-glow">Account Status</h3>
            </div>
            <span className="px-sm py-xs rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-bold shadow-[0_0_15px_theme(colors.primary-container)]">VERIFIED</span>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-md">
            <div>
              <h4 className="font-headline-md text-headline-md text-primary">Member Since</h4>
              <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-xs mt-xs">
                <span className="material-symbols-outlined text-[16px]">calendar_month</span> Today
              </p>
            </div>
            <Link to="reservations" className="px-md py-sm bg-white/10 hover:bg-white/20 text-primary border border-white/20 rounded-lg font-label-md text-label-md transition-all backdrop-blur-md flex items-center gap-xs">
              View Bookings
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Reservation Timeline (Match History from HTML) */}
      <section className="mt-12">
        <div className="flex justify-between items-end mb-md border-b border-white/10 pb-sm">
          <h2 className="font-headline-md text-headline-md text-primary">Recent Activity</h2>
          <Link to="reservations" className="text-primary-container font-label-md text-label-md hover:text-primary transition-colors flex items-center gap-xs">
            View All <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </Link>
        </div>
        <div className="flex flex-col gap-0 relative mt-4">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 top-4 bottom-4 w-px bg-white/10 z-0"></div>
          
          {/* Mock Timeline Item 1 */}
          <div className="flex items-start gap-md py-md relative z-10">
            <div className="w-8 h-8 rounded-full bg-surface-container border border-white/20 flex items-center justify-center shrink-0 mt-1">
              <div className="w-2 h-2 rounded-full bg-primary-container neon-glow"></div>
            </div>
            <div className="glass-panel rounded-xl p-md flex-1 flex flex-col md:flex-row justify-between items-start md:items-center gap-md hover:bg-white/[0.02] transition-colors">
              <div>
                <h4 className="font-body-lg text-body-lg text-primary font-bold">Account Created</h4>
                <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-xs mt-xs">
                  <span className="material-symbols-outlined text-[16px]">how_to_reg</span> Registration Successful
                </p>
              </div>
              <div className="flex items-center gap-md">
                <span className="px-sm py-xs rounded border border-primary-container/30 bg-primary-container/10 text-primary-container font-label-sm text-label-sm flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span> Completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
