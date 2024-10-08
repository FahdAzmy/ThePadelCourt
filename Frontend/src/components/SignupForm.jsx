/* eslint-disable react/no-unescaped-entities */
import { motion } from "framer-motion";
import { User, Key, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Signup } from "../api/api.js";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
const SignUpForm = () => {
  // State to hold server error messages
  const [serverError, setServerError] = useState(null);
  // State to hold success message
  const [successMessage, setSuccessMessage] = useState(null);
  // Hook for navigation
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is Required"),
    email: Yup.string()
      .email("Invalid Email Format")
      .required("Email is Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is Required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await Signup(values);
      console.log("Signup Successful", response);
      setServerError(null);
      // Set success message and navigate to login page after a delay
      setSuccessMessage("Register done. Go and login");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      // Handle known and unexpected errors
      if (error.response && error.response.status === 400) {
        setServerError(error.response.data.Message); // Set server error message
      } else {
        setServerError("An unexpected error occurred."); // Default error message
      }
    }
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
          Register
        </h2>
        <Formik
          initialValues={{ name: "", email: "", password: "", role: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-6 relative">
                <User
                  className="absolute top-3 left-3 text-white opacity-70"
                  size={20}
                />
                <Field
                  type="name"
                  className="w-full bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-70 rounded-xl py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-300"
                  placeholder="Name"
                  name="name"
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="error font-bold text-white"
                />
              </div>
              <div className="mb-6 relative">
                <Mail
                  className="absolute top-3 left-3 text-white opacity-70"
                  size={20}
                />
                <Field
                  type="email"
                  className="w-full bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-70 rounded-xl py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-300"
                  placeholder="Email"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="error font-bold text-white"
                />
              </div>
              <div className="mb-8 relative">
                <Key
                  className="absolute top-3 left-3 text-white opacity-70"
                  size={20}
                />
                <Field
                  type="password"
                  className="w-full bg-white bg-opacity-10 text-white placeholder-white placeholder-opacity-70 rounded-xl py-3 px-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-300"
                  placeholder="Password"
                  name="password"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="error font-bold text-white"
                />
              </div>
              <div className="text-white  flex gap-2  items-center mb-4 font-bold">
                <label>
                  <Field type="radio" name="role" value="owner" />
                  Owner
                </label>
                <label>
                  <Field type="radio" name="role" value="user" />
                  User
                </label>
              </div>

              {/* Server Error Message */}

              {serverError && (
                <p className="text-white mb-4 font-bold text-md mt-4">
                  {serverError}
                </p>
              )}

              {/* Success Message */}
              {successMessage && (
                <p className="text-green-500  mb-4 font-bold text-md text-sm mt-4">
                  {successMessage}
                </p>
              )}

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black font-bold py-3 px-4 rounded-xl shadow-lg hover:bg-opacity-90 transition duration-300 flex items-center justify-center"
              >
                Sign Up
              </motion.button>
            </Form>
          )}
        </Formik>
        <div className="mt-8 text-center">
          <p className="text-white font-semibold text-opacity-80">
            Already a member?{" "}
            <Link to="/login" className="font-bold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpForm;
