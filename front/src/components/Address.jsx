import React, { useEffect, useState } from "react";
import { deleteAddress, getUserAddress } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Address() {
  const navigate = useNavigate();
  const [address, setAddress] = useState();
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    const getaddress = async () => {
      const data = await getUserAddress();
      setAddress(data.address);
    };
    getaddress();
    setFetch(false);
  }, [fetch]);

  const handleDelete = async (id) => {
    setFetch(true);
    const deleted = await deleteAddress(id);
    toast.success(deleted.message, {
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
  };
  const handleUpdate = async (id) => {
    navigate(`/account/address/${id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Address</h2>
      {address ? (
        <div className="mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
            {address.map((data, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-gray-200 rounded-lg shadow-md p-4 "
                >
                  <p>Name : {data.firstName + " " + data.lastName}</p>
                  <p className="text-gray-600">
                    Address:{" "}
                    {data.address1 +
                      " " +
                      data?.address2 +
                      ", " +
                      data.city +
                      ", " +
                      data.state +
                      ", " +
                      data.pincode}
                  </p>
                  <p className="text-gray-600">
                    Contact Number: {data.contact}
                  </p>

                  <div className="flex gap-3">
                    <FaEdit
                      fontSize={25}
                      className="cursor-pointer"
                      title="Edit Address"
                      onClick={() => handleUpdate(data._id)}
                    />
                    <MdDelete
                      fontSize={25}
                      className="cursor-pointer"
                      title="Delete Address"
                      onClick={() => handleDelete(data._id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No Saved Address</p>
      )}

      <button
        onClick={() => navigate("/account/address")}
        className="bg-blue-600 text-white p-2 my-3 rounded-md hover:bg-blue-800"
      >
        Add New Address
      </button>
      <ToastContainer />
    </div>
  );
}
