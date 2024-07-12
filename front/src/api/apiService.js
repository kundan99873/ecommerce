import axios from "axios";

// Product
export const getProductDetails = async (id) => {
  const response = await axios.get(`/api/product/${id}`);
  return response.data;
};
export const getProducts = async () => {
  const response = await axios.get("/api/product");
  return response.data;
};
export const getProductByCategory = async (category) => {
  const response = await axios.get(`/api/product/get/?category=${category}`);
  return response.data;
};
export const getProductPagination = async (limit, page = 1) => {
  const response = await axios.get(
    `/api/product/paginate/?limit=${limit}&page=${page}`
  );
  return response.data;
};
export const getAllProducts = async () => {
  const response = await axios.get("/api/product/get");
  return response.data;
};
export const reviewProduct = async (id, data) => {
  const response = await axios.post(`/api/product/review/${id}`, data);
  return response.data;
};
export const rateProduct = async (id, data) => {
  const response = await axios.post(`/api/product/rating/${id}`, data);
  return response.data;
};

// Category
export const getCategory = async () => {
  const response = await axios.get("/api/category");
  return response.data;
};

// User
export const getUserDetails = async () => {
  const response = await axios.post("/api/user/info");
  return response.data;
};
export const loginUserApi = async (data) => {
  const response = await axios.post("/api/user/login", data);
  return response.data;
};
export const refreshToken = async () => {
  const response = await axios.post("/api/user/token");
  return response.data;
};
export const logoutUserApi = async () => {
  const response = await axios.post("/api/user/logout");
  return response.data;
};
export const UpdateUserApi = async (data) => {
  const response = await axios.put("/api/user/update", data);
  return response.data;
};
export const changePasswordApi = async (data) => {
  const response = await axios.post("/api/user/change", data);
  return response.data;
};
export const forgotPasswordApi = async (data) => {
  const response = await axios.post("/api/user/forgot", data);
  return response.data;
};
export const forgotPasswordTokenApi = async (id, token) => {
  const response = await axios.get(`/api/user/${id}/forgot/${token}`);
  return response.data;
};
export const forgotUserPasswordApi = async (id, token, data) => {
  const response = await axios.post(`/api/user/${id}/forgot/${token}`, data);
  return response.data;
};
export const verifyTokenApi = async (id, token) => {
  const response = await axios.get(`/api/user/${id}/verify/${token}`);
  return response.data;
};

// Banner
export const getBanners = async () => {
  const response = await axios.get("/api/banner");
  return response.data;
};

// Cart
export const getCart = async () => {
  const response = await axios.get("/api/cart");
  return response.data;
};
export const addToCart = async (data) => {
  const response = await axios.post("/api/cart/add", data);
  return response.data;
};
export const removeFromCart = async (data) => {
  const response = await axios.post("/api/cart/remove", data);
  return response.data;
};
export const removeUserCart = async () => {
  const response = await axios.delete("/api/cart/delete");
  return response.data;
};

// Wishlist
export const getWishlist = async (id) => {
  const response = await axios.post(`/api/wishlist/${id}`);
  return response.data;
};
export const addWishlist = async (data) => {
  const response = await axios.post("/api/wishlist/add", data);
  return response.data;
};
export const removeWishlist = async (data) => {
  const response = await axios.post("/api/wishlist/remove", data);
  return response.data;
};
export const allWishlist = async () => {
  const response = await axios.get("/api/wishlist/all");
  return response.data;
};

// Address
export const getUserAddress = async () => {
  const response = await axios.get("/api/address");
  return response.data;
};
export const getAddress = async (id) => {
  const response = await axios.get(`/api/address/${id}`);
  return response.data;
};
export const addAddress = async (data) => {
  const response = await axios.post("/api/address/add", data);
  return response.data;
};
export const deleteAddress = async (id) => {
  const response = await axios.delete(`/api/address/delete/${id}`);
  return response.data;
};
export const updateAddress = async (id, data) => {
  const response = await axios.put(`/api/address/update/${id}`, data);
  return response.data;
};

//payment
export const paymentApi = async (amount) => {
  const response = await axios.post("/api/payment/create", {
    amount,
  });
  return response.data;
};

//Order
export const addnewOrder = async (data) => {
  const response = await axios.post("/api/order/new", data);
  return response.data;
};
export const getAllOrder = async () => {
  const response = await axios.get("/api/order");
  return response.data;
};
export const updateOrder = async (id) => {
  const response = await axios.put(`/api/order/update/${id}`, data);
  return response.data;
};
export const deleteOrder = async (id) => {
  const response = await axios.delete(`/api/order/delete/${id}`, data);
  return response.data;
};
export const cancelOrder = async (id) => {
  const response = await axios.post(`/api/order/cancel/${id}`, data);
  return response.data;
};
export const getOrder = async (id) => {
  const response = await axios.get(`/api/order/${id}`);
  return response.data;
};
