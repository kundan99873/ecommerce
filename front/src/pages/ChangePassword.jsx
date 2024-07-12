import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { forgotUserPasswordApi } from "../api/apiService";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const { id, token } = useParams();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await forgotUserPasswordApi(id, token, data);
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
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      toast.error("Please enter correct password", {
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
      // reset();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md md:min-w-96 m-2 p-8 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              {...register("newPassword", {
                required: {
                  value: true,
                  message: "New Password is required",
                },
                minLength: {
                  value: 6,
                  message: "New Password must be at least 6 characters",
                },
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.newPassword && (
              <p className="text-center text-sm mt-1 text-red-800">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm New Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "Confirm Password is required",
                },
                validate: (value) =>
                  value === watch("newPassword") ||
                  "The passwords do not match",
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            {errors.confirmPassword && (
              <p className="text-center text-sm mt-1 text-red-800">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
