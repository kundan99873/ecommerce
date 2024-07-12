import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { UpdateUserApi } from "../api/apiService";
import { userData } from "../redux/user/userSlice";

export default function UpdateUser({ data }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [username, setUsername] = useState(user.name);

  const onSubmit = async (text) => {
    const formdata = new FormData();
    formdata.append("email", text.email);
    formdata.append("name", username);
    if (imageFile) {
      formdata.append("image", imageFile);
    }
    try {
      const password = await UpdateUserApi(formdata);
      if (password.success) {
        dispatch(userData());
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
        setTimeout(() => {
          data(false);
        }, 1000);
      }
    } catch (error) {
      toast.success("Something went wrong", {
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <>
      {user && (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded">
          <h2 className="text-2xl text-center font-bold mb-4">
            Update Details
          </h2>
          <div className="flex justify-center">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Image Preview"
                className="mt-4 h-24 w-24 object-cover rounded-full"
              />
            ) : (
              user.image && (
                <img
                  src={user.image.url}
                  alt="Image Preview"
                  className="mt-4 h-24 w-24 object-cover rounded-full"
                />
              )
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={username}
                {...register("name", {
                  required: {
                    value: true,
                    message: "Name is required",
                  },
                  minLength: {
                    value: 3,
                    message: "Name must be at least 6 characters",
                  },
                })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.name && (
                <p className="text-center text-sm mt-1 text-red-800">
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
                value={user.email}
                readOnly
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
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md"
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
