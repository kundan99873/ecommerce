import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <FaSpinner className="animate-spin text-7xl text-blue-500" />
      </div>
    </div>
  );
};

export default Loading;
