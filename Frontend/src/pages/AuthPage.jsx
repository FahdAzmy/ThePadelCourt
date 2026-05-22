import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Login, Signup } from "../api/api.js";
import { AuthContext } from "../Contexts/AuthContext.jsx";
import Logo from "../components/Logo.jsx";

const loginSchema = Yup.object({
  email: Yup.string().email("Invalid Email Format").required("Email is Required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is Required"),
});

const registerSchema = Yup.object({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email Format").required("Email is Required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is Required"),
  role: Yup.string().required("Please select a role"),
});

const authStyles = `
  .neon-focus:focus-within {
      box-shadow: 0 0 20px rgba(195, 244, 0, 0.2);
      border-color: #c3f400;
  }
  .neon-button-glow:hover { box-shadow: 0 0 30px rgba(195, 244, 0, 0.3); }
  @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slowZoom {
      0% { transform: scale(1); }
      50% { transform: scale(1.03); }
      100% { transform: scale(1); }
  }
  .bg-zoom { animation: slowZoom 45s ease-in-out infinite; will-change: transform; }
  .floating-input:focus + .floating-label,
  .floating-input:not(:placeholder-shown) + .floating-label {
      transform: translateY(-120%) scale(0.85);
      color: #c3f400;
      opacity: 1;
      background-color: #0A0A0A;
      padding: 0 4px;
      border-radius: 4px;
  }
  .mesh-bg {
      background-color: #0A0A0A;
      background-image:
          radial-gradient(at 10% 20%, hsla(70,100%,48%,0.05) 0px, transparent 50%),
          radial-gradient(at 90% 80%, hsla(70,100%,48%,0.03) 0px, transparent 50%);
  }
`;

export default function AuthPage({ defaultTab = "login" }) {
  const [loginError, setLoginError] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(null);
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname === "/register" ? "register" : defaultTab;

  const switchTab = (tab) => {
    if (activeTab === tab) {
      return;
    }

    setLoginError(null);
    setRegisterError(null);
    navigate(`/${tab}`);
  };

  const handleLoginSubmit = async (values, setSubmitting) => {
    try {
      await Login(values);
      setIsLoggedIn(true);
      setLoginError(null);
      navigate("/", { replace: true });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setLoginError(error.response.data.Message);
      } else {
        setLoginError("An unexpected error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegisterSubmit = async (values, setSubmitting) => {
    try {
      await Signup(values);
      setRegisterError(null);
      setRegisterSuccess("Registration successful! Switching to login...");
      setTimeout(() => {
        setRegisterSuccess(null);
        switchTab("login");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setRegisterError(error.response.data.Message);
      } else {
        setRegisterError("An unexpected error occurred.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <style>{authStyles}</style>
      
      <div className="bg-background text-on-surface min-h-screen overflow-x-hidden mesh-bg flex flex-col md:flex-row">
        {/* Left Column: Authentication Form */}
        <section className="w-full md:w-1/2 lg:w-[40%] flex flex-col justify-center px-margin-mobile md:px-margin-desktop py-xl relative z-10 bg-background/80 backdrop-blur-xl border-r border-white/5 min-h-screen">
          <div className="max-w-md w-full mx-auto flex flex-col gap-lg my-auto pt-[80px] md:pt-0">
            {/* Brand Anchor */}
            <div className="mb-md flex flex-col items-start">
              <Logo width={80} height={80} className="-ml-4 mb-2 drop-shadow-[0_0_15px_rgba(195,244,0,0.4)]" />
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary-container italic tracking-tighter">ThePadelCourt</h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-sm">Access your premium sports club experience.</p>
            </div>
            
            {/* Auth Toggle */}
            <div className="flex gap-sm p-xs bg-surface-container-highest/30 rounded-full backdrop-blur-md border border-white/5 w-fit mb-md relative">
              <div 
                className="absolute inset-y-1 w-[calc(50%-4px)] bg-primary-container rounded-full shadow-[0_0_15px_rgba(195,244,0,0.15)] transition-transform duration-300 ease-out z-0"
                style={{ transform: activeTab === 'login' ? 'translateX(0)' : 'translateX(calc(100% + 8px))' }}
              ></div>
              <button 
                type="button"
                className={`relative z-10 font-label-md text-label-md px-md py-sm rounded-full transition-all ${activeTab === 'login' ? 'text-on-primary' : 'text-on-surface-variant hover:text-primary'}`}
                onClick={() => switchTab('login')}
              >
                Log In
              </button>
              <button 
                type="button"
                className={`relative z-10 font-label-md text-label-md px-md py-sm rounded-full transition-all ${activeTab === 'register' ? 'text-on-primary' : 'text-on-surface-variant hover:text-primary'}`}
                onClick={() => switchTab('register')}
              >
                Register
              </button>
            </div>

            {/* Forms Container */}
            <div className="relative w-full overflow-hidden min-h-[420px]">
              
              {/* Login Form */}
              {activeTab === "login" && (
              <div className="w-full animate-[fadeIn_160ms_ease-out]">
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={loginSchema}
                  onSubmit={(values, { setSubmitting }) => handleLoginSubmit(values, setSubmitting)}
                >
                  {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-md pb-md">
                      <div className="relative group mt-2">
                        <Field name="email" id="login-email" type="email" placeholder=" " className="floating-input w-full bg-white/5 border border-white/10 rounded-lg px-md pt-6 pb-2 font-body-md text-body-md text-primary outline-none transition-all neon-focus" />
                        <label htmlFor="login-email" className="floating-label absolute left-md top-4 font-body-md text-body-md text-on-surface-variant/40 transition-all pointer-events-none origin-left">Email Address</label>
                        <ErrorMessage name="email" component="div" className="text-error font-label-sm text-label-sm mt-1" />
                      </div>
                      
                      <div className="relative group">
                        <Field name="password" id="login-password" type="password" placeholder=" " className="floating-input w-full bg-white/5 border border-white/10 rounded-lg px-md pt-6 pb-2 font-body-md text-body-md text-primary outline-none transition-all neon-focus" />
                        <label htmlFor="login-password" className="floating-label absolute left-md top-4 font-body-md text-body-md text-on-surface-variant/40 transition-all pointer-events-none origin-left">Password</label>
                        <ErrorMessage name="password" component="div" className="text-error font-label-sm text-label-sm mt-1" />
                      </div>

                      <div className="flex justify-between items-center px-xs mt-xs">
                        <label className="flex items-center gap-xs cursor-pointer">
                          <input type="checkbox" className="rounded bg-white/5 border-white/10 text-primary-container focus:ring-primary-container/30 focus:ring-offset-background" />
                          <span className="font-label-sm text-label-sm text-on-surface-variant">Remember me</span>
                        </label>
                        <a href="#" className="font-label-sm text-label-sm text-primary-container hover:underline hover:drop-shadow-[0_0_8px_rgba(195,244,0,0.4)] transition-all">Forgot password?</a>
                      </div>

                      {loginError && <div className="bg-error/10 border border-error/50 text-error p-3 rounded-lg font-body-md text-center">{loginError}</div>}

                      <button type="submit" disabled={isSubmitting} className="mt-md w-full bg-primary-container text-on-primary font-label-md text-label-md py-md rounded-lg flex justify-center items-center gap-xs transition-all duration-300 neon-button-glow hover:scale-105 active:scale-95">
                        <span>Enter Arena</span>
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
              )}

              {/* Register Form */}
              {activeTab === "register" && (
              <div className="w-full animate-[fadeIn_160ms_ease-out]">
                <Formik
                  initialValues={{ name: "", email: "", password: "", role: "user" }}
                  validationSchema={registerSchema}
                  onSubmit={(values, { setSubmitting }) => handleRegisterSubmit(values, setSubmitting)}
                >
                  {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-md pb-md">
                      <div className="relative group mt-2">
                        <Field name="name" id="reg-name" type="text" placeholder=" " className="floating-input w-full bg-white/5 border border-white/10 rounded-lg px-md pt-6 pb-2 font-body-md text-body-md text-primary outline-none transition-all neon-focus" />
                        <label htmlFor="reg-name" className="floating-label absolute left-md top-4 font-body-md text-body-md text-on-surface-variant/40 transition-all pointer-events-none origin-left">Full Name</label>
                        <ErrorMessage name="name" component="div" className="text-error font-label-sm text-label-sm mt-1" />
                      </div>
                      
                      <div className="relative group">
                        <Field name="email" id="reg-email" type="email" placeholder=" " className="floating-input w-full bg-white/5 border border-white/10 rounded-lg px-md pt-6 pb-2 font-body-md text-body-md text-primary outline-none transition-all neon-focus" />
                        <label htmlFor="reg-email" className="floating-label absolute left-md top-4 font-body-md text-body-md text-on-surface-variant/40 transition-all pointer-events-none origin-left">Email Address</label>
                        <ErrorMessage name="email" component="div" className="text-error font-label-sm text-label-sm mt-1" />
                      </div>
                      
                      <div className="relative group">
                        <Field name="password" id="reg-password" type="password" placeholder=" " className="floating-input w-full bg-white/5 border border-white/10 rounded-lg px-md pt-6 pb-2 font-body-md text-body-md text-primary outline-none transition-all neon-focus" />
                        <label htmlFor="reg-password" className="floating-label absolute left-md top-4 font-body-md text-body-md text-on-surface-variant/40 transition-all pointer-events-none origin-left">Password</label>
                        <ErrorMessage name="password" component="div" className="text-error font-label-sm text-label-sm mt-1" />
                      </div>

                      <div className="flex gap-4 items-center px-xs mt-xs">
                         <span className="font-label-md text-on-surface-variant">Account Type:</span>
                         <label className="flex items-center gap-xs cursor-pointer group">
                           <Field type="radio" name="role" value="user" className="hidden peer" />
                           <div className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center peer-checked:border-primary-container peer-checked:bg-primary-container/20">
                              <div className="w-2 h-2 rounded-full bg-primary-container opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                           </div>
                           <span className="font-body-md text-primary group-hover:text-primary-container transition-colors">Player</span>
                         </label>
                         <label className="flex items-center gap-xs cursor-pointer group">
                           <Field type="radio" name="role" value="owner" className="hidden peer" />
                           <div className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center peer-checked:border-primary-container peer-checked:bg-primary-container/20">
                              <div className="w-2 h-2 rounded-full bg-primary-container opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                           </div>
                           <span className="font-body-md text-primary group-hover:text-primary-container transition-colors">Owner</span>
                         </label>
                      </div>
                      <ErrorMessage name="role" component="div" className="text-error font-label-sm text-label-sm" />

                      {registerError && <div className="bg-error/10 border border-error/50 text-error p-3 rounded-lg font-body-md text-center">{registerError}</div>}
                      {registerSuccess && <div className="bg-primary-container/10 border border-primary-container/50 text-primary-container p-3 rounded-lg font-body-md text-center">{registerSuccess}</div>}

                      <button type="submit" disabled={isSubmitting} className="mt-md w-full bg-primary-container text-on-primary font-label-md text-label-md py-md rounded-lg flex justify-center items-center gap-xs transition-all duration-300 neon-button-glow hover:scale-105 active:scale-95">
                        <span>Join the Club</span>
                        <span className="material-symbols-outlined text-[20px]">sports_tennis</span>
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
              )}
            </div>
          </div>
        </section>

        {/* Right Column: Visual Splendor (Hidden on Mobile) */}
        <section className="hidden md:flex flex-1 relative overflow-hidden bg-surface-container-lowest">
          <div className="absolute inset-0 bg-cover bg-center bg-zoom opacity-60" style={{backgroundImage: "url('/PadelPlayer.jpg')"}}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/20"></div>
          
          <div className="relative z-10 w-full h-full flex items-end p-xl pb-[120px]">
            <div className="max-w-lg p-lg rounded-xl bg-background/30 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              <span className="material-symbols-outlined text-[48px] text-primary-container/40 mb-sm block">format_quote</span>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-md leading-tight">Where precision meets passion.</h2>
              <div className="flex items-center gap-sm">
                <div className="w-12 h-[2px] bg-primary-container shadow-[0_0_8px_rgba(195,244,0,0.8)]"></div>
                <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">The Arena Awaits</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
