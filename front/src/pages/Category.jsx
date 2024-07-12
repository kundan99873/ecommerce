import React from "react";
import { useLoaderData } from "react-router-dom";
import Product from "../components/Product";
import CategorySection from "../components/Category";

export default function Category() {
  const { products } = useLoaderData();
  return (
    <div>
      <CategorySection />
      <h2 className="text-center text-4xl font-medium my-8">Products</h2>
      <Product products={products} />
    </div>
  );
}
