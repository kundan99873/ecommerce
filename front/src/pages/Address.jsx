import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addAddress } from "../api/apiService";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Address() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const response = await addAddress(data);
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
      navigate("/account");
    }, 800);
  };

  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value.replace(/\D/g, "");
    setValue(newValue);
  };
  const handleChange2 = (e) => {
    const newValue2 = e.target.value.replace(/\D/g, "");
    setValue2(newValue2);
  };

  return (
    <div className=" mx-6 my-2">
      <h2 className="text-3xl text-center font-medium my-4">Add New Address</h2>
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          {/* Personal Information Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-2 border rounded-md"
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "First Name is required",
                    },
                  })}
                />
                {errors.firstName && (
                  <p className="text-center text-sm mt-1 text-red-800">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-2 border rounded-md"
                  {...register("lastName", {
                    required: { value: true, message: "Last Name is required" },
                  })}
                />
                {errors.lastName && (
                  <p className="text-center text-sm mt-1 text-red-800">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full p-2 border rounded-md"
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
              <div>
                <input
                  type="text"
                  placeholder="Contact Number"
                  className="w-full p-2 border rounded-md"
                  {...register("contact", {
                    required: {
                      value: true,
                      message: "Contact Number is required",
                    },
                    pattern: {
                      value: /^\+?[1-9]\d{9}$/,
                      message: "Please enter a proper Contact Number",
                    },
                  })}
                  maxLength={10}
                  value={value}
                  onChange={handleChange}
                />
                {errors.contact && (
                  <p className="text-center text-sm mt-1 text-red-800">
                    {errors.contact.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Shipping Address Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="Address Line 1"
                  className="w-full p-2 border rounded-md"
                  {...register("address1", {
                    required: { value: true, message: "address1 is required" },
                  })}
                />
                {errors.address1 && (
                  <p className="text-center text-sm mt-1 text-red-800">
                    {errors.address1.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Address Line 2"
                  className="w-full p-2 border rounded-md"
                  {...register("address2")}
                />
                {errors.address2 && (
                  <p className="text-center text-sm mt-1 text-red-800">
                    {errors.address2.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full p-2 border rounded-md"
                  {...register("city", {
                    required: { value: true, message: "City is required" },
                  })}
                />
                {errors.city && (
                  <p className="text-center text-sm mt-1 text-red-800">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="State"
                  className="w-full p-2 border rounded-md"
                  {...register("state", {
                    required: { value: true, message: "State is required" },
                  })}
                />
                {errors.state && (
                  <p className="text-center text-sm mt-1 text-red-800">
                    {errors.state.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Pin Code"
                  className="w-full p-2 border rounded-md"
                  {...register("pincode", {
                    required: { value: true, message: "Pin Code is required" },
                    pattern: {
                      value: /^\+?[0-9]\d{5}$/,
                      message: "Please enter a proper pin code",
                    },
                  })}
                  maxLength={6}
                  value={value2}
                  onChange={handleChange2}
                />
                {errors.pincode && (
                  <p className="text-center text-sm mt-1 text-red-800">
                    {errors.pincode.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full p-2 border rounded-md"
                  {...register("country", {
                    required: { value: true, message: "Country is required" },
                  })}
                />
                {errors.country && (
                  <p className="text-center text-sm mt-1 text-red-800">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 my-3 rounded-md hover:bg-blue-800"
              >
                Add Address
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
