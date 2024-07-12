import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import Order from "./pages/Order.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Unprotected from "./components/Unprotected.jsx";
import Protected from "./components/Protected.jsx";
import {
  forgotPasswordTokenApi,
  getAddress,
  getAllOrder,
  getAllProducts,
  getBanners,
  getOrder,
  getProductByCategory,
  getProductDetails,
  getProducts,
  verifyTokenApi,
} from "./api/apiService.js";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import MyAccount from "./pages/MyAccount.jsx";
import Address from "./pages/Address.jsx";
import UpdateAddress from "./pages/UpdateAddress.jsx";
import ErrorPage from "./pages/Error.jsx";
import OrderPage from "./pages/Checkout.jsx";
import OrderDetail from "./pages/OrderDetail.jsx";
import AccountPage from "./pages/Checkout.jsx";
import About from "./pages/About.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import Verify from "./pages/Verify.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import Policy from "./pages/Policy.jsx";
import TermsOfService from "./pages/TermsOfService.jsx";
import Contact from "./components/Contact.jsx";
import Category from "./pages/Category.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="" element={<Home />} loader={getBanners} />
        <Route
          path="product/:id"
          element={<Product />}
          loader={({ params }) => getProductDetails(params.id)}
          errorElement={<ErrorPage />}
        />
        <Route
          path="category/:category"
          element={<Category />}
          loader={({ params }) => getProductByCategory(params.category)}
          errorElement={<ErrorPage />}
        />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="policy" element={<Policy />} />
        <Route path="terms" element={<TermsOfService />} />
        <Route path="products" element={<Products />} loader={getProducts} />
        <Route path="" element={<Unprotected />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot" element={<ForgotPassword />} />
        </Route>
        <Route path="" element={<Protected />}>
          <Route path="orders" element={<Order />} loader={getAllOrder} />
          <Route
            path="order/:id"
            element={<OrderDetail />}
            loader={({ params }) => getOrder(params.id)}
            errorElement={<ErrorPage />}
          />
          <Route path="account" element={<MyAccount />} />
          <Route
            path="account/address/:id"
            element={<UpdateAddress />}
            loader={({ params }) => getAddress(params.id)}
          />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="account/address" element={<Address />} />
          <Route path="test" element={<AccountPage />} />
        </Route>
      </Route>
      <Route path="*" element={<ErrorPage />} />
      <Route
        path="/user/:id/verify/:token"
        element={<Verify />}
        loader={({ params }) => verifyTokenApi(params.id, params.token)}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/user/:id/forgot/:token"
        element={<ChangePassword />}
        loader={({ params }) => forgotPasswordTokenApi(params.id, params.token)}
        errorElement={<ErrorPage />}
      />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
