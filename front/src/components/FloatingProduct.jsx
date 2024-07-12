import React, { useRef } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import "../App.css";
import { useNavigate } from "react-router-dom";

const FloatingProduct = ({ products, handleLike }) => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -300, // Adjust the scroll distance as needed
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 300, // Adjust the scroll distance as needed
      behavior: "smooth",
    });
  };

  const handleProduct = (id) => {
    navigate(`/product/${id}`);
    handleLike(false);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-2 rounded"
        >
          <FaArrowAltCircleLeft size={30} />
        </button>
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-2"
        >
          {products &&
            products.map((product) => {
              return (
                <div
                  key={product._id}
                  className="flex-none w-80 h-96  cursor-pointer rounded-lg shadow-md p-4 my-3 hover-animate hover-animate:hover"
                  onClick={() => handleProduct(product._id)}
                >
                  <img
                    src={product.image.url}
                    alt={"product_image"}
                    className="w-full h-52 object-cover mb-4 rounded-lg"
                  />
                  <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                  <p className="text-gray-700 mb-2">
                    {product.description.length < 55
                      ? product.description
                      : product.description.substring(0, 55) + "..."}
                  </p>
                  <p className="text-gray-900 font-bold">Rs. {product.price}</p>
                </div>
              );
            })}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white p-2 rounded"
        >
          <FaArrowAltCircleRight size={30} />
        </button>
      </div>
    </div>
  );
};

export default FloatingProduct;
