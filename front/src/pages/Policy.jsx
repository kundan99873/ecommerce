import React from "react";
import { Link } from "react-router-dom";

const Policy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Policies</h1>
      <div className="space-y-6 text-lg text-gray-700">
        <h2 className="text-2xl font-bold">1. Shipping Policy</h2>
        <p className="text">
          We strive to deliver your orders swiftly and efficiently. Orders are
          processed within 1-2 business days. Shipping times vary based on
          location and shipping method selected during checkout.
        </p>

        <h2 className="text-2xl font-bold">2. Return Policy</h2>
        <p className="text">
          We want you to be completely satisfied with your purchase. If you are
          not happy with your order for any reason, you may return it within 30
          days of delivery for a full refund. Please ensure the item is unused
          and in its original packaging.
        </p>

        <h2 className="text-2xl font-bold">3. Privacy Policy</h2>
        <p className="text">
          Your privacy is important to us. We collect and use your personal
          information to process orders and provide a personalized shopping
          experience.
        </p>
      </div>
    </div>
  );
};

export default Policy;
