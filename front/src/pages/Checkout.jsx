import React from "react";

const OrderDetails = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Order Details</h1>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">Order Status</p>
            <p>Delivered on Apr 03</p>
          </div>
          <div>
            <button className="bg-gray-200 px-4 py-2 rounded mr-2">
              Need Help
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Reorder
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
          <p>
            S M Road, Gaurav Harmony, Sion East, Antop Hill Kairali hotel,
            Mumbai, Maharashtra, 400037
          </p>

          <h2 className="text-xl font-bold mt-6 mb-4">Order Details</h2>
          <div>
            <p>
              <strong>Name:</strong> Kundan Chaudhary
            </p>
            <p>
              <strong>Order Number:</strong> 16084396470242047A
            </p>
            <p>
              <strong>Shipment Number:</strong> 16084396470242047A-01
            </p>
            <p>
              <strong>Order Date:</strong> 2 April 2023
            </p>
            <p>
              <strong>Product Total:</strong> ₹497.00
            </p>
            <p>
              <strong>Delivery Fee:</strong> FREE
            </p>
            <p>
              <strong>Order Amount:</strong> ₹497.00
            </p>
            <p>
              <strong>Invoice Number:</strong> TMV633523509773
            </p>
            <p>
              <strong>Payment Mode:</strong> COD
            </p>
          </div>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Order Items (2)</h2>
          <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <div className="flex items-center mb-4">
              <img
                className="w-20 h-20 object-cover mr-4"
                src="https://via.placeholder.com/80"
                alt="Product"
              />
              <div>
                <h3 className="text-lg font-bold">
                  Fortune Premium Kachi Ghani Pure Mustard Oil 1 L (Pouch)
                </h3>
                <p className="text-gray-600">₹330.00</p>
                <p className="text-gray-600">Qty: 2</p>
              </div>
            </div>
            <div>
              <p className="text-sm">
                You rated this product:{" "}
                <span className="text-yellow-500">★★★★☆</span>
              </p>
              <p className="text-sm">
                We're glad you liked it!{" "}
                <a href="#" className="text-blue-500">
                  Tell us more
                </a>
              </p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center mb-4">
              <img
                className="w-20 h-20 object-cover mr-4"
                src="https://via.placeholder.com/80"
                alt="Product"
              />
              <div>
                <h3 className="text-lg font-bold">
                  Fortune Premium Kachi Ghani Pure Mustard Oil 1 L
                </h3>
                <p className="text-gray-600">₹167.00</p>
                <p className="text-gray-600">Qty: 1</p>
              </div>
            </div>
            <div>
              <p className="text-sm">
                Rate this product:{" "}
                <span className="text-yellow-500">☆☆☆☆☆</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
