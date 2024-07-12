import React from "react";
import { useForm } from "react-hook-form";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordApi } from "../api/apiService";

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await forgotPasswordApi(data);
      if (response.success) {
        toast.success(response.message, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      toast.error("Please register your account", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      reset();
    }
  };

  return (
    <div className="bg-gray-200 flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col w-full max-w-md">
        <div className="mb-4">
          <h2 className="text-center font-bold text-xl mb-4">
            Forgot Password
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
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Forgot Password
              </button>
            </div>
            <p className="text-gray-700 text-center mt-4 mb-4">
              Back to Login!! &nbsp;
              <Link
                to={"/login"}
                className="font-bold text-blue-500 hover:text-blue-800"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
