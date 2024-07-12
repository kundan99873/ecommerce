import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({
  errorCode = 404,
  errorMessage = "Oops! Something went wrong",
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold mb-4">{errorCode || "Error"}</h1>
      <p className="text-xl mb-4">{errorMessage || "Something went wrong."}</p>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded"
        onClick={() => navigate("/")}
      >
        Go Home
      </button>
    </div>
  );
};

export default ErrorPage;
