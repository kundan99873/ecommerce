import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import emptyCartImage from "../assets/empty-cart.webp";
import { useNavigate } from "react-router-dom";
import {
  addCartItem,
  getCartItem,
  removeCartItem,
} from "../redux/cart/userCartSlice";

export default function Cart({ isOpen, setIsOpen }) {
  const cart = useSelector((state) => state.userCart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);

  useEffect(() => {
    getCartItem();
  }, []);

  useEffect(() => {
    setProduct(cart.products);
  }, [cart, dispatch]);

  const handleShopping = () => {
    setIsOpen(false);
    navigate("/");
  };

  const handleCheckout = () => {
    setIsOpen(false);
    navigate("/checkout");
  };

  const handleCartLogin = () => {
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className={`${
            !isOpen && "hidden"
          } fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}
        ></div>

        <div
          className={`${
            !isOpen
              ? "transform transition ease-in-out duration-1000 translate-x-full"
              : "transform transition ease-in-out duration-1000 translate-x-0"
          } fixed inset-0 overflow-hidden translate-x-0`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between border-b pb-3 border-gray-200">
                      <h2
                        className="text-lg font-medium text-gray-900"
                        id="slide-over-title"
                      >
                        Shopping Cart
                      </h2>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setIsOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5"></span>
                          <span className="sr-only">Close panel</span>
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {!user.isLogin ? (
                      <div className="text-xl flex flex-col items-center h-full justify-center font-semibold">
                        <p>Login to your account</p>
                        <button
                          className="my-2 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                          onClick={handleCartLogin}
                        >
                          Login
                        </button>
                      </div>
                    ) : product.length == 0 ? (
                      <div className="text-xl flex items-center h-full justify-center font-semibold">
                        <img src={emptyCartImage} alt="cart is empty" />
                      </div>
                    ) : (
                      <div className="mt-5">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {product.map((e, index) => {
                              return (
                                <li
                                  key={index}
                                  className="flex py-6 border-b border-gray-200"
                                >
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={e.image}
                                      alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a href="#">{e.title}</a>
                                        </h3>
                                        <p className="ml-4">Rs. {e.price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {e.category}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500 text-base font-medium">
                                        Quantity
                                      </p>
                                      <div className="flex gap-2 md:gap-5">
                                        <button
                                          disabled={
                                            e.quantity === 1 ? true : false
                                          }
                                          className="cursor-pointer text-base font-bold"
                                          onClick={() =>
                                            dispatch(
                                              addCartItem({
                                                product: e.id,
                                                quantity: -1,
                                              })
                                            )
                                          }
                                        >
                                          -
                                        </button>
                                        <span className=" text-base font-bold">
                                          {e.quantity}
                                        </span>
                                        <button
                                          disabled={
                                            e.quantity >= 5 ? true : false
                                          }
                                          className="font-bold cursor-pointer"
                                          onClick={() =>
                                            dispatch(
                                              addCartItem({
                                                product: e.id,
                                                quantity: 1,
                                              })
                                            )
                                          }
                                        >
                                          +
                                        </button>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-indigo-600 hover:text-indigo-500"
                                          onClick={() =>
                                            dispatch(
                                              removeCartItem({
                                                product: e.id,
                                              })
                                            )
                                          }
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  {user.isLogin && cart?.products?.length > 0 && (
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>Rs. {cart?.amount}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <button
                          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                          onClick={handleCheckout}
                        >
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={handleShopping}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// <>
//   <div
//     className="relative z-10"
//     aria-labelledby="slide-over-title"
//     role="dialog"
//     aria-modal="true"
//   >
//     <div
//       className={`${
//         !isOpen && "hidden"
//       } fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity`}
//     ></div>

//     <div
//       className={`${
//         !isOpen
//           ? "transform transition ease-in-out duration-1000 translate-x-full"
//           : "transform transition ease-in-out duration-1000 translate-x-0"
//       } fixed inset-0 overflow-hidden translate-x-0`}
//     >
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
//           <div className="pointer-events-auto w-screen max-w-md">
//             <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
//               <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
//                 <div className="flex items-start justify-between border-b pb-3 border-gray-200">
//                   <h2
//                     className="text-lg font-medium text-gray-900"
//                     id="slide-over-title"
//                   >
//                     Shopping Cart
//                   </h2>
//                   <div className="ml-3 flex h-7 items-center">
//                     <button
//                       type="button"
//                       onClick={() => setIsOpen(false)}
//                       className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
//                     >
//                       <span className="absolute -inset-0.5"></span>
//                       <span className="sr-only">Close panel</span>
//                       <svg
//                         className="h-6 w-6"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         strokeWidth="1.5"
//                         stroke="currentColor"
//                         aria-hidden="true"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M6 18L18 6M6 6l12 12"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </div>

//                 {empty ? (
//                   <div className="text-xl flex items-center h-full justify-center font-semibold">
//                     <img src={emptyCartImage} alt="cart is empty" />
//                   </div>
//                 ) : (
//                   <div className="mt-5">
//                     <div className="flow-root">
//                       <ul
//                         role="list"
//                         className="-my-6 divide-y divide-gray-200"
//                       >
//                         {cart.product.map((e, index) => {
//                           return (
//                             <li
//                               key={index}
//                               className="flex py-6 border-b border-gray-200"
//                             >
//                               <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
//                                 <img
//                                   src={e.image}
//                                   alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
//                                   className="h-full w-full object-cover object-center"
//                                 />
//                               </div>

//                               <div className="ml-4 flex flex-1 flex-col">
//                                 <div>
//                                   <div className="flex justify-between text-base font-medium text-gray-900">
//                                     <h3>
//                                       <a href="#">{e.title}</a>
//                                     </h3>
//                                     <p className="ml-4">Rs. {e.price}</p>
//                                   </div>
//                                   <p className="mt-1 text-sm text-gray-500">
//                                     {e.id}
//                                   </p>
//                                 </div>
//                                 <div className="flex flex-1 items-end justify-between text-sm">
//                                   <p className="text-gray-500 text-base font-medium">
//                                     Quantity
//                                   </p>
//                                   <div className="flex gap-2 md:gap-5">
//                                     <button
//                                       disabled={
//                                         e.quantity >= 5 ? true : false
//                                       }
//                                       className="font-bold"
//                                       onClick={() =>
//                                         dispatch(
//                                           addToCart({
//                                             product: {
//                                               id: e.id,
//                                               quantity: 1,
//                                             },
//                                             amount: e.price,
//                                           })
//                                         )
//                                       }
//                                     >
//                                       +
//                                     </button>
//                                     <span className=" text-base font-bold">
//                                       {e.quantity}
//                                     </span>
//                                     <button
//                                       disabled={
//                                         e.quantity === 1 ? true : false
//                                       }
//                                       className=" text-base font-bold"
//                                       onClick={() =>
//                                         dispatch(
//                                           removeFromCart({
//                                             product: {
//                                               id: e.id,
//                                               quantity: 1,
//                                             },
//                                             amount: e.price,
//                                           })
//                                         )
//                                       }
//                                     >
//                                       -
//                                     </button>
//                                   </div>

//                                   <div className="flex">
//                                     <button
//                                       type="button"
//                                       className="font-medium text-indigo-600 hover:text-indigo-500"
//                                       onClick={() =>
//                                         dispatch(
//                                           deleteFromCart({
//                                             id: e.id,
//                                             amount: e.price * e.quantity,
//                                           })
//                                         )
//                                       }
//                                     >
//                                       Remove
//                                     </button>
//                                   </div>
//                                 </div>
//                               </div>
//                             </li>
//                           );
//                         })}
//                       </ul>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {!empty && (
//                 <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
//                   <div className="flex justify-between text-base font-medium text-gray-900">
//                     <p>Subtotal</p>
//                     <p>Rs. {cart.amount}</p>
//                   </div>
//                   <p className="mt-0.5 text-sm text-gray-500">
//                     Shipping and taxes calculated at checkout.
//                   </p>
//                   <div className="mt-6">
//                     <a
//                       href="#"
//                       className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
//                     >
//                       Checkout
//                     </a>
//                   </div>
//                   <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
//                     <p>
//                       or
//                       <button
//                         type="button"
//                         className="font-medium text-indigo-600 hover:text-indigo-500"
//                         onClick={handleShopping}
//                       >
//                         Continue Shopping
//                         <span aria-hidden="true"> &rarr;</span>
//                       </button>
//                     </p>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </>
