import { Outlet, useOutlet } from "react-router-dom";
import UserSidebar from "../components/UserProfile/UserSidebar";
import withGuard from "../utils/withGuard";
import { UserProvider } from "../components/UserProfile/UserContext";

function ProfilePage() {
  const outlet = useOutlet();

  return (
    <UserProvider>
      <style>{`
        .glass-panel {
            background: rgba(32, 31, 31, 0.4);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .neon-glow {
            box-shadow: 0 0 20px rgba(195, 244, 0, 0.2);
        }
        .neon-glow-intense {
            box-shadow: 0 0 30px rgba(195, 244, 0, 0.4);
        }
        .text-neon-glow {
            text-shadow: 0 0 10px rgba(195, 244, 0, 0.5);
        }
      `}</style>
      <div className="bg-background text-on-surface font-body-md text-body-md h-screen w-full flex overflow-hidden selection:bg-primary-container selection:text-on-primary">
        <UserSidebar />
        
        <main className="flex-1 relative overflow-y-auto overflow-x-hidden pb-24 md:pb-0 pt-20">
          <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-lg flex flex-col gap-xl">
             {outlet && <Outlet />}
          </div>
        </main>
      </div>
    </UserProvider>
  );
}

export default withGuard(ProfilePage);
