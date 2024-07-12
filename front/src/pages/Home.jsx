import React, { useEffect, useRef, useState } from "react";
import ImageSlider from "../components/Imageslider";
import Product from "../components/Product";
import { useLoaderData } from "react-router-dom";
import { getProductPagination } from "../api/apiService";
import { getCartItem } from "../redux/cart/userCartSlice";
import { useDispatch, useSelector } from "react-redux";
import CategorySection from "../components/Category";
export default function Home() {
  const data = useLoaderData();
  const [product, setProduct] = useState();

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  useEffect(() => {
    const getProduct = async () => {
      const data = await getProductPagination(8);
      setProduct(shuffleArray(data.products));
    };
    getProduct();
    if (user.isLogin) {
      dispatch(getCartItem());
    }
  }, []);

  return (
    <>
      <div className="">
        <ImageSlider banners={data.banner} />
        <CategorySection />
        <p className="text-center text-xl md:text-4xl font-medium my-8">
          Feature Product
        </p>
        <Product products={product} />
      </div>
    </>
  );
}
