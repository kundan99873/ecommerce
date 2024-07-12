import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/user/userSlice";

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
    reset();
  };
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col w-full max-w-md">
        <div className="mb-4">
          <h2 className="text-center font-bold text-xl mb-4">
            Login to Your Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} method="POST">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a proper email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-center text-sm mt-1 text-red-800">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-3 relative">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type={visible ? "text" : "password"}
                placeholder="******************"
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                  minLength: {
                    value: 6,
                    message: "Password must be atleast 6 character",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password should be less than 20 character",
                  },
                })}
              />
              {errors.password && (
                <p className="text-center text-sm  mt-1 text-red-800">
                  {errors.password.message}
                </p>
              )}
              <div className="absolute inset-y-0 right-1 top-3 pr-3 flex items-center">
                {visible ? (
                  <FaEye
                    onClick={() => setVisible(false)}
                    className="text-xl cursor-pointer"
                  />
                ) : (
                  <FaEyeSlash
                    onClick={() => setVisible(true)}
                    className="text-xl cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
              <Link
                className="inline-block align-baseline text text-blue-500 hover:text-blue-800"
                to={"/forgot"}
              >
                Forgot Password
              </Link>
            </div>
            <p className="text-gray-700  text-center mt-4 mb-4">
              Don't have an account? &nbsp;
              <Link
                to={"/register"}
                className="font-bold text-blue-500 hover:text-blue-800"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer containerId="loginpage" />
    </div>
  );
}
