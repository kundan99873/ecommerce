// src/OrderPage.js
import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const OrderPage = () => {
  const { order: orders } = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-8">My Orders</h1>
        {orders.length == 0 ? (
          <div className="flex justify-center items-center flex-col">
            <p className="text-lg font-semibold text-center">
              Not any orders have placed
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 w-36 text-white rounded-lg py-2 px-4 m-3 hover:bg-blue-600 cursor-pointer"
            >
              Order Now
            </button>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg mb-6 cursor-pointer hover-animate hover-animate:hover"
              onClick={() => navigate(`/order/${order._id}`)}
            >
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold">
                      Order ID: {order._id}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Placed on {order.createdAt.split("T")[0]}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-bold ${
                        order.status === "Delivered"
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                {order.products.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-4"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.productDetails.image.url}
                        alt={item.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div className="ml-4">
                        <h3 className="text-md font-semibold">
                          {item.productDetails.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {item.productDetails.category}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-md font-semibold">
                        ₹ {item.productDetails.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold">
                    Total: ₹ {order.amount}
                  </p>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    View Order Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderPage;
