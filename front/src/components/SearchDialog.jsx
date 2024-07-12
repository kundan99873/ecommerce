import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getAllProducts } from "../api/apiService";
import { useNavigate } from "react-router-dom";

export default function SearchDialog({ isOpenSearch, setIsOpenSearch }) {
  const closeDialog = () => setIsOpenSearch(false);

  const [products, setProducts] = useState([]);
  const [searchedProduct, setSearchedProduct] = useState([]);

  useEffect(() => {
    const data = async () => {
      const product = await getAllProducts();
      setProducts(product.products);
    };
    data();
  }, []);

  const handleInput = (e) => {
    setSearchedProduct(
      products.filter((product) => {
        return e.target.value && product.title.startsWith(e.target.value);
      })
    );
  };

  const navigate = useNavigate();

  const handleSearch = (id) => {
    navigate(`/product/${id}`);
    setIsOpenSearch(false);
  };

  return (
    <div>
      {isOpenSearch && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg md:max-w-xl lg:max-w-2xl h-auto md:h-3/4 mx-2">
            <div className="flex justify-end mb-3">
              <button onClick={closeDialog} className="text-3xl text-gray-500">
                &times;
              </button>
            </div>
            <div className="flex items-center border rounded-md overflow-hidden">
              <div className="pl-3">
                <FaSearch className="text-gray-500" />
              </div>
              <input
                type="text"
                onChange={handleInput}
                className="w-full px-3 py-2 border-0 focus:outline-none"
                placeholder="Search..."
              />
            </div>
            <div className="h-56 md:h-96 overflow-y-auto scrollbar-hide">
              {searchedProduct.length == 0 ? (
                <div className="flex justify-center items-center">
                  <p className="text-lg font-semibold my-4">No search result</p>
                </div>
              ) : (
                <ul role="list" className="my-6 mx-1">
                  {searchedProduct.map((product) => {
                    return (
                      <li
                        key={product._id}
                        className="flex border rounded-xl border-gray-200 px-10 py-1 cursor-pointer my-2"
                        onClick={() => handleSearch(product._id)}
                      >
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.image.url}
                            alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <p className="text-lg">{product.title}</p>
                              </h3>
                              <p className="ml-4">Rs. {product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.category}
                            </p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
