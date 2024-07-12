import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken, userData } from "./redux/user/userSlice.js";
import { useEffect } from "react";
import { getCartItem } from "./redux/cart/userCartSlice.js";
import Announcement from "./components/Announcement.jsx";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    
    const getUser = async () => {
      await dispatch(refreshToken());
    };
    getUser();
    if (user.isLogin) {
      dispatch(userData());
      dispatch(getCartItem());
    }
  }, [dispatch, user.isLogin]);

  return (
    <>
      <div className={`bg-gray-50 flex flex-col min-h-screen`}>
        <Announcement />
        <Navbar />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
