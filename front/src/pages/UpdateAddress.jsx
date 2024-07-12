import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { updateAddress } from "../api/apiService";

export default function UpdateAddress() {
  const [data, setData] = useState(useLoaderData().address);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (input) => {
    const response = await updateAddress(data._id, input);
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

  const handleNumber = (e) => {
    const newValue = e.target.value.replace(/\D/g, "");
    setData({ ...data, [e.target.name]: newValue });
  };

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div>
      {data && (
        <div className=" mx-6 my-2">
          <h2 className="text-3xl text-center font-medium my-4">
            Update Address
          </h2>
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} method="POST">
              {/* Personal Information Section */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">
                  Personal Information
                </h2>
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
                      name="firstName"
                      value={data.firstName}
                      onChange={handleInput}
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
                        required: {
                          value: true,
                          message: "Last Name is required",
                        },
                      })}
                      name="lastName"
                      value={data.lastName}
                      onChange={handleInput}
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
                          value:
                            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Please enter a proper email address",
                        },
                      })}
                      name="email"
                      value={data.email}
                      onChange={handleInput}
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
                      name="contact"
                      maxLength={10}
                      value={data.contact}
                      onChange={handleNumber}
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
                        required: {
                          value: true,
                          message: "address1 is required",
                        },
                      })}
                      name="address1"
                      value={data.address1}
                      onChange={handleInput}
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
                      value={data?.address2}
                      name="address2"
                      onChange={handleInput}
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
                      value={data.city}
                      name="city"
                      onChange={handleInput}
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
                      value={data.state}
                      name="state"
                      onChange={handleInput}
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
                        required: {
                          value: true,
                          message: "Pin Code is required",
                        },
                        pattern: {
                          value: /^\+?[0-9]\d{5}$/,
                          message: "Please enter a proper pin code",
                        },
                      })}
                      maxLength={6}
                      value={data.pincode}
                      name="pincode"
                      onChange={handleNumber}
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
                        required: {
                          value: true,
                          message: "Country is required",
                        },
                      })}
                      name="country"
                      value={data.country}
                      onChange={handleInput}
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
                    Update Address
                  </button>
                </div>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      )}
    </div>
  );
}
