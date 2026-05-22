import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="bg-background text-on-background min-h-screen overflow-hidden flex flex-col items-center justify-center relative font-body-md selection:bg-primary-container selection:text-on-primary-container">
      {/* Atmospheric Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="bg-ball bg-ball-1"></div>
        <div className="bg-ball bg-ball-2"></div>
        <div className="bg-ball bg-ball-3"></div>
        {/* Grid overlay to give 'arena' feel */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNjAgMEwwIDYwTTYwIDYwSDBWMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAyKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-50"></div>
      </div>
      {/* Main Content Canvas */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-margin-mobile md:px-margin-desktop w-full max-w-4xl mx-auto h-full min-h-screen">
        {/* Giant Faint 404 Watermark */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-[-1] flex items-center justify-center w-full">
          <span className="font-display-lg text-[160px] md:text-[280px] font-extrabold text-white opacity-[0.03] tracking-tighter">404</span>
        </div>
        {/* Visual Element: Stylized Padel Net & Ball */}
        <div className="relative w-full max-w-[280px] h-32 md:h-48 mb-lg flex items-center justify-center border-b border-white/5">
          {/* The Net */}
          <svg className="absolute right-1/4 h-full animated-net" preserveAspectRatio="none" viewBox="0 0 20 100">
            <line className="opacity-50" stroke="#8e9379" strokeDasharray="4 4" strokeWidth="2" x1="10" x2="10" y1="0" y2="100"></line>
            <line className="opacity-30" stroke="#8e9379" strokeWidth="1" x1="12" x2="12" y1="0" y2="100"></line>
          </svg>
          {/* The Ball (Padel Neon) */}
          <div className="absolute right-1/4 w-5 h-5 md:w-8 md:h-8 rounded-full bg-primary-container shadow-[0_0_20px_rgba(195,244,0,0.6)] animated-ball flex items-center justify-center">
            {/* Inner detail for ball */}
            <div className="w-1/2 h-1/2 rounded-full border border-on-primary-container opacity-20"></div>
          </div>
        </div>
        {/* Typography Context */}
        <div className="flex flex-col items-center max-w-2xl backdrop-blur-sm bg-surface-container-lowest/30 p-md md:p-xl rounded-xl border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <h1 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-primary tracking-tighter mb-sm uppercase italic">
            Out of Bounds!
          </h1>
          <p className="font-body-md text-body-lg text-on-surface-variant mb-xl leading-relaxed">
            Looks like that shot went wide. The page you are looking for has bounced out of play or never existed on this court.
          </p>
          {/* CTA Button */}
          <Link 
            to="/" 
            replace={true}
            className="group relative inline-flex items-center justify-center gap-base px-lg py-sm md:py-md rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md uppercase tracking-widest shadow-[0_0_30px_rgba(195,244,0,0.3)] hover:shadow-[0_0_50px_rgba(195,244,0,0.6)] hover:scale-105 transition-all duration-300 active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px] group-hover:-translate-x-1 transition-transform duration-300">arrow_back</span>
            Return to Arena
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ErrorPage;
