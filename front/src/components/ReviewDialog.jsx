import React, { useState } from "react";
import { BsStar, BsStarFill } from "react-icons/bs";
import { reviewProduct } from "../api/apiService";
import { Bounce, toast } from "react-toastify";

export default function ReviewDialog({ dialog, setDialog, product }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmit = async () => {
    const data = await reviewProduct(product, { review, rating });
    if (data.success) {
      toast.success("Thanks for adding review", {
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
      setDialog(false);
    }
  };

  return (
    <div>
      {dialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg md:max-w-xl lg:max-w-2xl h-auto md:h-2/3 mx-2">
            <div className="flex justify-end mb-3">
              <button
                onClick={() => setDialog(false)}
                className="text-3xl text-gray-500"
              >
                &times;
              </button>
            </div>
            <p className="m-1 font-semibold">Write a Review</p>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              placeholder="Write your review here..."
              rows={7}
              value={review}
              onChange={handleReviewChange}
            />

            <div className="flex items-center mb-2">
              <p className="mr-4 font-semibold">Rating</p>
              {[...Array(5)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleRatingChange(index + 1)}
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

            <div className="flex justify-center mt-4">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
