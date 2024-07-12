import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import FloatingProduct from "../components/FloatingProduct";
import axios from "axios";
import { getProductByCategory, getWishlist } from "../api/apiService";
import { addCartItem } from "../redux/cart/userCartSlice";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { BsStarFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

export default function Product() {
  const { product, varient, reviews, ratings } = useLoaderData();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [color, setColor] = useState(product.color);
  const [size, setSize] = useState(product.size);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState();
  const [wishlist, setWishlist] = useState(false);

  const user = useSelector((state) => state.user);

  let rating = 0;
  if (ratings.length > 0) {
    const rate = ratings.reduce((a, b) => a + b, 0);
    rating = (rate / ratings.length).toFixed(1);
  }

  useEffect(() => {
    const getProduct = async () => {
      const data = await getProductByCategory(product.category);
      setProducts(data.products);
    };
    getProduct();

    if (user.isLogin) {
      const wish = async () => {
        const getWish = await getWishlist(product._id);
        if (getWish.success) {
          setWishlist(true);
        }
      };
      wish();
    }
  }, []);

  // const user = useSelector(state => state.us)
  const colors = [
    "red",
    "blue",
    "green",
    "orange",
    "grey",
    "white",
    "black",
    "yellow",
    "purple",
    "pink",
    "voilet",
  ];
  const sizes = ["SM", "M", "L", "XL", "XXL"];
  const ratingDistribution = {
    5: ratings.filter((num) => num === 5).length,
    4: ratings.filter((num) => num === 4).length,
    3: ratings.filter((num) => num === 3).length,
    2: ratings.filter((num) => num === 2).length,
    1: ratings.filter((num) => num === 1).length,
  };

  const handleChange = (color, size) => {
    setColor(color);
    setSize(size);
    let target = varient[color]?.[size]?.id || varient[color]["_id"];
    navigate(`/product/${target}`);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const handleMobileVarient = (id) => {
    navigate(`/product/${id}`);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };

  const data = {
    product: product._id,
    quantity: 1,
  };
  const handleAddToCart = () => {
    if (user.isLogin) {
      dispatch(addCartItem(data));
      toast.success("Added to cart successfully", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        containerId: "productPage",
      });
    } else {
      toast.success("Please Login before adding product to the cart", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        containerId: "productPage",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    }
  };

  const handleLikeBtn = async () => {
    await axios
      .post("/api/wishlist/add", { product: product._id })
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          containerId: "productPage",
        });
      });
    setWishlist(true);
  };

  const handleDislikeBtn = async () => {
    await axios
      .post("/api/wishlist/remove", { product: product._id })
      .then((res) => {
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          containerId: "productPage",
        });
      });
    setWishlist(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:space-x-8 mb-8">
            <div className="md:w-1/2 md:ml-8">
              <img
                src={product.image.url}
                alt={product.title}
                className="w-full h-auto rounded-lg shadow-md mb-4"
              />
            </div>
            <div className="md:w-2/3">
              <div className="flex justify-between">
                <h1 className="text-3xl font-bold mb-2">
                  {product.title.toUpperCase()}
                </h1>
                {user.isLogin &&
                  (wishlist ? (
                    <FcLike
                      onClick={handleDislikeBtn}
                      className="text-3xl mx-4 cursor-pointer"
                    />
                  ) : (
                    <FcLikePlaceholder
                      onClick={handleLikeBtn}
                      className="text-3xl mx-4 cursor-pointer"
                    />
                  ))}
              </div>
              {ratings.length > 0 && (
                <p className="text-gray-500">
                  <span className="bg-red-500 text-sm rounded-md text-white text-center px-2 mr-3">
                    {rating}{" "}
                    <BsStarFill
                      className="inline text-center pb-0.5"
                      color="white"
                    />
                  </span>
                  {ratings.length} ratings & {reviews.length} reviews
                </p>
              )}
              <p className="text-lg text-gray-700 mb-4">{product.category}</p>
              <p className="text-gray-800 mb-4">{product.description}</p>
              <p className="text-xl font-semibold mb-4">Rs. {product.price}</p>

              <div className="mt-6 flex flex-wrap justify-between sm:justify-normal pr-3 items-center space-x-9">
                {Object.keys(varient).length !== 0 && (
                  <div className="flex items-center">
                    <label
                      htmlFor="color"
                      className="block mr-2 font-medium text-gray-700"
                    >
                      Color
                    </label>
                    <div className="flex space-x-3 mt-1">
                      {colors.map((item) => {
                        return (
                          varient[item] && (
                            <button
                              key={item}
                              className={`w-8 h-8 p-1 rounded-full ${
                                item == "white" || item == "black"
                                  ? "bg-" + item + " hover:bg-" + item
                                  : "bg-" +
                                    item +
                                    "-700 hover:bg-" +
                                    item +
                                    "-800"
                              } border-2 ${
                                color == item
                                  ? "border-black"
                                  : "border-slate-400"
                              }`}
                              title={item}
                              onClick={() => handleChange(item, size)}
                            ></button>
                          )
                        );
                      })}
                    </div>
                  </div>
                )}

                {product.size && (
                  <div className="flex items-center">
                    <label
                      htmlFor="size"
                      className="block text-sm mr-2 font-medium text-gray-700"
                    >
                      Size
                    </label>
                    <select
                      id="size"
                      name="size"
                      value={size}
                      onChange={(e) => handleChange(color, e.target.value)}
                      className="bg-gray-200 p-2 rounded-lg cursor-pointer px-4"
                    >
                      {sizes.map((e) => {
                        return (
                          Object.keys(varient[color]).includes(e) && (
                            <option key={e} value={e}>
                              {e.toUpperCase()}
                            </option>
                          )
                        );
                      })}
                    </select>
                  </div>
                )}
              </div>
              {product.ram && (
                <div>
                  <br />
                  <label
                    htmlFor="size"
                    className="block text-sm mr-2 font-medium text-gray-700"
                  >
                    RAM + Storage
                  </label>
                  <div className="flex gap-2 flex-wrap items-center my-4">
                    {Object.keys(varient[color]).map((item) => {
                      return Object.keys(varient[color][item]).map(
                        (e, idx) =>
                          item !== "_id" && (
                            <p
                              key={e}
                              onClick={() =>
                                handleMobileVarient(varient[color][item][e])
                              }
                              className={`border-2 cursor-pointer  p-2 rounded-md ${
                                varient[color][item][e] == product._id
                                  ? "border-black"
                                  : "border-gray-300"
                              }`}
                            >
                              {item + " + " + e}
                            </p>
                          )
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-6">
                {product.quantity != 0 ? (
                  <button
                    onClick={handleAddToCart}
                    className="bg-blue-500 text-white py-2 px-4 mr-3 rounded-md hover:bg-blue-600"
                  >
                    ADD TO CART
                  </button>
                ) : (
                  <p className="text-lg font-semibold">Out Of Stock</p>
                )}
              </div>
            </div>
          </div>

          {/* Similar Products Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
            <FloatingProduct products={products} handleLike={setWishlist} />
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Rating Distribution</h2>
            {ratings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3">
                <div className="space-y-2 col-span-2">
                  {Object.entries(ratingDistribution).map(([rating, count]) => (
                    <div key={rating} className="flex items-center">
                      <div className="w-28 text-right mr-2 flex items-center justify-end">
                        {Array.from({ length: rating }).map((_, index) => (
                          <BsStarFill
                            size={13}
                            className="mr-0.5 text-yellow-500"
                          />
                        ))}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 ml-2">
                        <div
                          className="bg-yellow-500 h-3 rounded-full"
                          style={{
                            width: `${(count / ratings.length) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <div className="w-12 text-left ml-2">{count}</div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 col-span-1">
                  <div className="flex justify-center items-center my-4 md:my-0 flex-col h-full">
                    <div className="flex gap-2">
                      <p className="text-2xl font-bold">{rating}</p>
                      <BsStarFill size={28} className="text-yellow-500" />
                    </div>
                    <p className="text-lg font-semibold">
                      {ratings.length} ratings & {reviews.length} reviews
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-lg font-semibold">
                No rating of this product
              </p>
            )}
          </div>

          {/* Reviews Section */}
          <div>
            <h2 className="text-xl font-bold mt-4">Reviews</h2>
            {reviews.length == 0 ? (
              <p className="text-center text-lg font-semibold">
                No review of this product
              </p>
            ) : (
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white p-4 rounded-lg shadow-md mb-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    {review.image ? (
                      <img
                        src={review?.image?.url}
                        alt=""
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <FaUser />
                    )}
                    <h3 className="text-lg font-semibold mr-2">
                      {review.name}
                    </h3>
                    <div className="flex">
                      {Array.from({ length: review.rating }).map((_, index) => (
                        <svg
                          key={index}
                          className="h-5 w-5 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.5 3 1.5-6.5L1 8l6.5-1L10 1l2.5 6L19 8l-5 3.5L15.5 18z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.review}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      <ToastContainer containerId="productPage" />
    </>
  );
}
