import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategory } from "../api/apiService";
import Loading from "../components/Loading";

const CategorySection = () => {
  const [categories, setCategories] = useState();
  useEffect(() => {
    const getCat = async () => {
      const data = await getCategory();
      setCategories(data.category);
    };
    getCat();
  }, []);

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="text-center text-xl md:text-4xl font-medium my-8">
        Shop by Category
      </h2>
      {!categories ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/category/${category.name}`}
              className="block relative group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={category.image.url}
                alt={category.name}
                className="w-full h-48 object-cover "
              />
              <h3 className="absolute inset-0 flex items-center justify-center text-white font-semibold text-xl md:hidden">
                {capitalizeFirstLetter(category.name)}
              </h3>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl text-white font-semibold">
                  {capitalizeFirstLetter(category.name)}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySection;
