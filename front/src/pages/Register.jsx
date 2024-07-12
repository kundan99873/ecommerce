import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);

  const onSubmit = async (data) => {
    const formdata = new FormData();
    formdata.append("email", data.email);
    formdata.append("name", data.name);
    formdata.append("password", data.password);
    if (imageFile) {
      formdata.append("image", imageFile);
    }

    await axios
      .post("/api/user/register", formdata)
      .then((res) => {
        toast.success(res.data.message, {
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
        }, 5000);
      })
      .catch((err) =>
        toast.error(err.response.data.message, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        })
      );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const [visible, setVisible] = useState(false);
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col w-full max-w-md">
        <div className="mb-4">
          <h2 className="text-center font-bold text-xl mb-4">
            Create an Account
          </h2>
          <form
            method="post"
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Full Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Full Name"
                {...register("name", {
                  required: { value: true, message: "Full Name is required" },
                  minLength: {
                    value: 3,
                    message: "Full Name must be atleast 3 character",
                  },
                  maxLength: {
                    value: 20,
                    message: "Full Name should be less than 20 character",
                  },
                })}
              />
              {errors.name && (
                <p className="text-center mt-1 text-sm text-red-800">
                  {errors.name.message}
                </p>
              )}
            </div>
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
            <div className="mb-6 relative">
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
              <div className="absolute inset-y-0 top-2 right-1 pr-3 flex items-center">
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
              {errors.password && (
                <p className="text-center text-sm text-red-800">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="image"
              >
                Profile Image
              </label>
              <input
                type="file"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="image"
                onChange={handleImageChange}
              />
            </div>
            {errors.image && (
              <p className="text-center mt-1 text-red-800">
                {errors.image.message}
              </p>
            )}

            <div className="flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </div>
            <p className="text-gray-700 text-center mt-4 mb-4">
              Already have an account? &nbsp;
              <Link
                to={"/login"}
                className="font-bold text-blue-500 hover:text-blue-800"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
