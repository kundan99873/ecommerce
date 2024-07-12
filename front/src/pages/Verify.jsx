import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyAccount = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">
        Your are successfully verified
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <button
        onClick={handleVerify}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Back to Home page
      </button>
    </div>
  );
};

export default VerifyAccount;
