import { useEffect, useState } from "react";
import {
  FaBars,
  FaTimes,
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import Cart from "./Cart";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/user/userSlice";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchDialog from "./SearchDialog";
import { getCartItem, signOutCart } from "../redux/cart/userCartSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const cart = useSelector((state) => state.userCart);
  const auth = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState(0);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(cart.products.length);
  }, [cart, dispatch]);

  const openDialog = () => setIsOpenSearch(true);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsOpenUser(false);
    dispatch(signOutCart());
    navigate("/login");
  };

  const handleAccount = () => {
    navigate("/account");
    setIsOpenUser(false);
  };

  const handleOrder = () => {
    navigate("/orders");
    setIsOpenUser(false);
  };

  return (
    <div>
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <NavLink to="/" className=" font-semibold text-lg px-3">
              ShopNow
            </NavLink>
          </div>
          <div className="hidden md:flex items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "border-b-4 border-blue-500 px-8 font-semibold py-4"
                  : "px-8 font-semibold py-4"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "border-b-4 border-blue-500 px-8 font-semibold py-4"
                  : "px-8 font-semibold py-4"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "border-b-4 border-blue-500 px-8 font-semibold py-4"
                  : "px-8 font-semibold py-4"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "border-b-4 border-blue-500 px-8 font-semibold py-4"
                  : "px-8 font-semibold py-4"
              }
            >
              Contact
            </NavLink>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <FaSearch className="text-xl cursor-pointer" onClick={openDialog} />
            {auth.isLogin ? (
              <div className="relative">
                {auth?.user?.image ? (
                  <img
                    src={auth?.user?.image?.url}
                    alt=""
                    height={24}
                    width={24}
                    className="rounded-full cursor-pointer"
                    onClick={() =>
                      isOpenUser ? setIsOpenUser(false) : setIsOpenUser(true)
                    }
                  />
                ) : (
                  <p
                    className="bg-red-600 px-2 text-lg rounded-full text-white text-bold cursor-pointer"
                    onClick={() =>
                      isOpenUser ? setIsOpenUser(false) : setIsOpenUser(true)
                    }
                  >
                    {auth.user?.name.charAt(0).toUpperCase()}
                  </p>
                )}
                {isOpenUser && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white  dark:bg-black dark:text-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <button
                      onClick={handleAccount}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                    >
                      My account
                    </button>
                    <button
                      onClick={handleOrder}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-1"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to={"/login"}>
                <FaUser className=" cursor-pointer" size={24} />
              </Link>
            )}
            <div className="relative pr-6">
              <FaShoppingCart
                className="cursor-pointer"
                size={24}
                onClick={() => setIsOpenCart(true)}
              />
              {cartItems > 0 && (
                <span className="bg-red-500 rounded-full w-4 h-4 flex items-center justify-center absolute -top-1 right-4 text-white text-xs">
                  {cartItems}
                </span>
              )}
            </div>
          </div>
          <div className="md:hidden">
            {isOpen ? (
              <FaTimes
                onClick={toggleNavbar}
                className=" cursor-pointer"
                size={24}
              />
            ) : (
              <div className="flex gap-3 mx-3 py-4">
                <FaSearch
                  className="cursor-pointer"
                  onClick={openDialog}
                  size={24}
                />
                {auth.isLogin ? (
                  <div className="relative">
                    {auth?.user?.image ? (
                      <img
                        src={auth?.user?.image.url}
                        alt=""
                        height={24}
                        width={24}
                        className="rounded-full cursor-pointer"
                        onClick={() =>
                          isOpenUser
                            ? setIsOpenUser(false)
                            : setIsOpenUser(true)
                        }
                      />
                    ) : (
                      <p
                        className="bg-red-600 h-6 w-6 text-center rounded-full text-white text-bold cursor-pointer"
                        onClick={() =>
                          isOpenUser
                            ? setIsOpenUser(false)
                            : setIsOpenUser(true)
                        }
                      >
                        {auth.user?.name.charAt(0).toUpperCase()}
                      </p>
                    )}
                    {isOpenUser && (
                      <div
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white  dark:bg-black dark:text-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="user-menu-button"
                        tabIndex="-1"
                      >
                        <button
                          onClick={handleAccount}
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-0"
                        >
                          My account
                        </button>
                        <button
                          onClick={handleOrder}
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-1"
                        >
                          My Orders
                        </button>
                        <button
                          onClick={handleLogout}
                          className="block px-4 py-2 text-sm text-gray-700"
                        >
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to={"/login"}>
                    <FaUser className=" cursor-pointer" size={24} />
                  </Link>
                )}
                <div className="relative" onClick={() => setIsOpenCart(true)}>
                  <FaShoppingCart className=" cursor-pointer" size={24} />
                  {cartItems > 0 && (
                    <span className="bg-red-500 rounded-full w-4 h-4 flex items-center justify-center absolute -top-1 -right-1 text-white text-xs">
                      {cartItems}
                    </span>
                  )}
                </div>
                <FaBars
                  onClick={toggleNavbar}
                  className=" cursor-pointer"
                  size={24}
                />
              </div>
            )}
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden bg-white dark:bg-black dark:text-white fixed top-0 right-0 h-full w-3/5 z-50 flex flex-col justify-start items-end pt-20">
            <button
              onClick={toggleNavbar}
              className="absolute top-0 left-0 p-3"
            >
              <FaTimes className="" size={24} />
            </button>
            <div className="flex flex-col items-start w-full">
              <NavLink to="/" className=" py-2 pl-4 font-semibold">
                Home
              </NavLink>
              <NavLink to="/products" className=" py-2 pl-4 font-semibold">
                Products
              </NavLink>
              <NavLink to="/about" className=" py-2 pl-4 font-semibold">
                About
              </NavLink>
              <NavLink to="/contact" className=" py-2 pl-4 font-semibold">
                Contact
              </NavLink>
            </div>
          </div>
        )}
      </nav>
      <Cart isOpen={isOpenCart} setIsOpen={setIsOpenCart} />
      <SearchDialog
        isOpenSearch={isOpenSearch}
        setIsOpenSearch={setIsOpenSearch}
      />
      <ToastContainer />
    </div>
  );
};

export default Navbar;
