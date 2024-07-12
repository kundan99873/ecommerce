import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { useLoaderData } from "react-router-dom";
import {
  getAllProducts,
  getCategory,
  getProductByCategory,
} from "../api/apiService";

export default function Products() {
  const product = useLoaderData();

  const [data, setData] = useState(product);

  const [category, setCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sort, setSort] = useState("");

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    (async () => {
      const data = await getCategory();
      setCategory(data.category);
    })();
    setData({ products: shuffleArray(data.products) });
  }, []);

  const handleCategory = async (value) => {
    setSelectedCategory(value);
    let category = value.toLowerCase();
    setSort("");
    if (value == "all") {
      setData({ products: shuffleArray(product.products) });
    } else {
      setData({
        products: shuffleArray(
          product.products.filter((item) => item.category === category)
        ),
      });
    }
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    e.target.value == "price_asc" &&
      setData({
        products: [...data.products].sort((a, b) => a.price - b.price),
      });
    e.target.value == "price_desc" &&
      setData({
        products: [...data.products].sort((a, b) => b.price - a.price),
      });
  };

  return (
    <div>
      <div className="bg-gray-100 shadow-md">
        <div className="container mx-auto">
          <nav className="flex overflow-x-auto scrollbar-hide mb-6 mx-auto">
            <button
              onClick={() => handleCategory("all")}
              className={`text-gray-700 hover:text-gray-900 whitespace-nowrap px-16 py-4 text-xl font-semibold ${
                selectedCategory == "all" && "border-b-2 border-blue-500"
              }`}
            >
              All
            </button>
            {category?.map((category) => (
              <button
                key={category._id}
                onClick={() => handleCategory(category.name)}
                className={`text-gray-700 hover:text-gray-900 whitespace-nowrap px-16 py-4 text-xl font-semibold ${
                  selectedCategory == category.name &&
                  "border-b-2 border-blue-500"
                }`}
              >
                {category.name}
              </button>
            ))}
          </nav>
        </div>
      </div>
      <div className="mx-10 my-5 flex justify-end mb-4">
        <div>
          <label htmlFor="sort" className="mr-2">
            Sort by:
          </label>
          <select
            id="sort"
            name="sort"
            className="py-1 px-2 border rounded-lg"
            value={sort}
            onChange={handleSort}
          >
            <option value="relevence" selected>
              Relevance
            </option>
            <option value="price_asc">Price Low to High</option>
            <option value="price_desc">Price High to Low</option>
          </select>
        </div>
      </div>
      <Product products={data.products} />
    </div>
  );
}
