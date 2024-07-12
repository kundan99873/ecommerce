import React, { useEffect, useState } from "react";
import { allWishlist } from "../api/apiService";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const getWishlist = async () => {
      const data = await allWishlist();
      setWishlist(data.product);
    };
    getWishlist();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Wishlist</h2>
      {wishlist && wishlist.length == 0 ? (
        <p className="text-lg font-semibold text-center">
          No items in wishlist
        </p>
      ) : (
        <div className="mx-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
            {wishlist?.map((product) => (
              <div
                key={product._id}
                className="bg-white min-w-7 rounded-lg shadow-md p-4 hover-animate hover-animate:hover"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img
                  src={product?.image.url}
                  alt={"product_image"}
                  className="w-full h-52 object-cover mb-4 rounded-lg"
                />
                <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <p className="text-gray-900 font-bold">Rs. {product.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
