import React from "react";
import { useForm } from "react-hook-form";
import { changePasswordApi } from "../api/apiService";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePassword = ({ data }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (text) => {
    try {
      const password = await changePasswordApi(text);
      if (password.success) {
        toast.success(password.message, {
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
        data(false);
      }
    } catch (error) {
      toast.success("Please enter correct password", {
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
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Current Password is required",
              },
              minLength: {
                value: 6,
                message: "Current Password must be atleast 6 character",
              },
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.password && (
            <p className="text-center text-sm  mt-1 text-red-800">
              {errors.password.message}
            </p>
          )}
        </div>
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
                message: "New Password must be atleast 6 character",
              },
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.newPassword && (
            <p className="text-center text-sm  mt-1 text-red-800">
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
                value === watch("newPassword") || "The passwords do not match",
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.confirmPassword && (
            <p className="text-center text-sm  mt-1 text-red-800">
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
  );
};

export default ChangePassword;
