import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { BsStarFill, BsStar } from "react-icons/bs";
import ReviewDialog from "../components/ReviewDialog";
import { rateProduct } from "../api/apiService";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderDetails = () => {
  const { order } = useLoaderData();
  const [dialog, setDialog] = useState(false);
  const [product, setProduct] = useState();

  const handleDialog = (id) => {
    setDialog(true);
    setProduct(id);
  };

  const [rating, setRating] = useState(0);

  const handleRatingChange = async (newRating, id) => {
    setRating(newRating);
    const data = await rateProduct(id, { rating: newRating });
    toast.success(data.message, {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      containerId: "orderdetails",
    });
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-center">Order Details</h1>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">Order Status</p>
            <p>{order.status}</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4 lg:col-span-1">
          <h2 className="text-xl font-bold mb-4">Order Details</h2>
          <div>
            <p>
              <strong>Order Number:</strong> {order._id}
            </p>
            <p>
              <strong>Name:</strong> {order.name}
            </p>
            <p>
              <strong>Order Date:</strong> {order.createdAt.split("T")[0]}
            </p>
            <p>
              <strong>Product Total:</strong> ₹ {order.amount}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Address:</strong> {order.address}
            </p>
            <p>
              <strong>Payment Mode:</strong> {order.paymentMethod}
            </p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">
            Order Items ({order.detailedProducts.length})
          </h2>
          {order.detailedProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-lg p-4 mb-4"
            >
              <div className="flex items-center mb-4 gap-2">
                <img
                  className="w-24 h-24 object-cover rounded-md mr-4"
                  src={product.image.url}
                  alt="Product"
                />
                <div>
                  <h3 className="text-lg font-bold">{product.title}</h3>
                  <p className="">{product.category}</p>
                  <p className="font-semibold">₹ {product.price}</p>
                  <p className="">Quantity: {product.quantity}</p>
                </div>
              </div>
              <div className="flex justify-between">
                <p
                  onClick={() => handleDialog(product._id)}
                  className="text-blue-400 cursor-pointer"
                >
                  Review this product
                </p>
                <div>
                  {[...Array(5)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleRatingChange(index + 1, product._id)}
                      className="text-yellow-500"
                    >
                      {index < rating ? (
                        <BsStarFill size={24} className="mr-1" />
                      ) : (
                        <BsStar className="text-gray-300 mr-1" size={24} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ReviewDialog dialog={dialog} setDialog={setDialog} product={product} />
      <ToastContainer containerId={"orderdetails"} />
    </div>
  );
};

export default OrderDetails;
