/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { motion } from "framer-motion";
import { User, Key, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ModernLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md rounded-3xl p-8 shadow-2xl w-full max-w-md border border-white border-opacity-20"
      >
        <h2 className="text-4xl font-extrabold text-center text-white mb-8 tracking-tight">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 relative">
            <User
              className="absolute top-3 left-3 text-white opacity-70"
              size={20}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-70 rounded-xl py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-300"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-8 relative">
            <Key
              className="absolute top-3 left-3 text-white opacity-70"
              size={20}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-70 rounded-xl py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-300"
              placeholder="Password"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-white text-black font-bold py-3 px-4 rounded-xl shadow-lg hover:bg-opacity-90 transition duration-300 flex items-center justify-center"
          >
            Sign In
            <ArrowRight className="ml-2" size={20} />
          </motion.button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-white text-opacity-80">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ModernLoginForm;
