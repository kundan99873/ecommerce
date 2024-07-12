import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Payment from "./Payment";
import { useForm } from "react-hook-form";
import { getUserAddress } from "../api/apiService";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const CheckoutPage = () => {
  const cart = useSelector((state) => state.userCart);

  const [isPayment, setIsPayment] = useState(false);
  const [data, setData] = useState();
  const [showForm, setShowForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState();
  const [address, setAddress] = useState();
  const [fetch, setFetch] = useState(false);
  const [products, setProducts] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    setProducts({
      product: cart.products,
      total: cart.amount,
    });
  }, [cart]);

  useEffect(() => {
    if (cart.products.length == 0) {
      navigate("/");
    }
  }, []);

  const formRef = useRef(null);
  useEffect(() => {
    const getaddress = async () => {
      const data = await getUserAddress();
      setAddress(data.address);
    };
    getaddress();
    setFetch(false);
  }, [fetch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm();

  const formData = getValues();
  const handleForm = async () => {
    if (!showForm && address) {
      if (!selectedAddress) {
        toast.success("Please select or add address", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return;
      }
      setIsPayment(true);
    } else {
      if (formRef.current) {
        formRef.current.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
      }
      const isValid = await trigger();
      if (isValid) {
        setIsPayment(true);
      }
    }
  };

  const onSubmit = (data) => {};

  const handleNumber = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  };

  const handleAddress = (e) => {
    setSelectedAddress(e._id);
    setData(e);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {!products ? (
        <Loading />
      ) : (
        <div className="w-full max-w-7xl p-6 bg-white shadow-md mt-3 rounded-lg">
          <h1 className="text-2xl text-center font-bold mb-6">CHECKOUT</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            {!showForm && address ? (
              <div className="lg:col-span-2">
                <div className="mx-auto p-4 w-full">
                  <div className="flex flex-wrap gap-6">
                    {address.map((data, idx) => {
                      return (
                        <div
                          key={idx}
                          className={`bg-white rounded-lg max-w-72 shadow-md p-4 cursor-pointer ${
                            selectedAddress === data._id &&
                            "border-2 border-black"
                          }`}
                          onClick={() => handleAddress(data)}
                        >
                          <p>Name : {data.firstName + " " + data.lastName}</p>
                          <p className="text-gray-600">
                            Address:{" "}
                            {data.address1 +
                              " " +
                              data?.address2 +
                              ", " +
                              data.city +
                              ", " +
                              data.state +
                              ", " +
                              data.pincode}
                          </p>
                          <p className="text-gray-600">
                            Contact Number: {data.contact}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-blue-600 text-white p-2 my-3 rounded-md hover:bg-blue-800"
                >
                  Add New Address
                </button>
                <Payment
                  setIsPayment={setIsPayment}
                  isPayment={isPayment}
                  products={{ products, data, selected: true }}
                />
              </div>
            ) : (
              <div className="lg:col-span-2">
                <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Personal Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          placeholder="First Name"
                          className="w-full p-2 border rounded-md"
                          {...register("firstName", {
                            required: {
                              value: true,
                              message: "First Name is required",
                            },
                          })}
                          name="firstName"
                        />
                        {errors.firstName && (
                          <p className="text-center text-sm mt-1 text-red-800">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Last Name"
                          className="w-full p-2 border rounded-md"
                          {...register("lastName", {
                            required: {
                              value: true,
                              message: "Last Name is required",
                            },
                          })}
                          name="lastName"
                        />
                        {errors.lastName && (
                          <p className="text-center text-sm mt-1 text-red-800">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Email"
                          className="w-full p-2 border rounded-md"
                          {...register("email", {
                            required: {
                              value: true,
                              message: "Email is required",
                            },
                            pattern: {
                              value:
                                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                              message: "Please enter a proper email address",
                            },
                          })}
                          name="email"
                        />
                        {errors.email && (
                          <p className="text-center text-sm mt-1 text-red-800">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Contact Number"
                          className="w-full p-2 border rounded-md"
                          {...register("contact", {
                            required: {
                              value: true,
                              message: "Contact Number is required",
                            },
                            pattern: {
                              value: /^\+?[1-9]\d{9}$/,
                              message: "Please enter a proper Contact Number",
                            },
                          })}
                          name="contact"
                          maxLength={10}
                          onChange={handleNumber}
                        />
                        {errors.contact && (
                          <p className="text-center text-sm mt-1 text-red-800">
                            {errors.contact.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Shipping Address
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          placeholder="Address Line 1"
                          className="w-full p-2 border rounded-md"
                          {...register("address1", {
                            required: {
                              value: true,
                              message: "address1 is required",
                            },
                          })}
                          name="address1"
                        />
                        {errors.address1 && (
                          <p className="text-center text-sm mt-1 text-red-800">
                            {errors.address1.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Address Line 2"
                          className="w-full p-2 border rounded-md"
                          {...register("address2")}
                          name="address2"
                        />
                        {errors.address2 && (
                          <p className="text-center text-sm mt-1 text-red-800">
                            {errors.address2.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="City"
                          className="w-full p-2 border rounded-md"
                          {...register("city", {
                            required: {
                              value: true,
                              message: "City is required",
                            },
                          })}
                          name="city"
                        />
                        {errors.city && (
                          <p className="text-center text-sm mt-1 text-red-800">
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="State"
                          className="w-full p-2 border rounded-md"
                          {...register("state", {
                            required: {
                              value: true,
                              message: "State is required",
                            },
                          })}
                          name="state"
                        />
                        {errors.state && (
                          <p className="text-center text-sm mt-1 text-red-800">
                            {errors.state.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Pin Code"
                          className="w-full p-2 border rounded-md"
                          {...register("pincode", {
                            required: {
                              value: true,
                              message: "Pin Code is required",
                            },
                            pattern: {
                              value: /^\+?[0-9]\d{5}$/,
                              message: "Please enter a proper pin code",
                            },
                          })}
                          maxLength={6}
                          name="pincode"
                          onChange={handleNumber}
                        />
                        {errors.pincode && (
                          <p className="text-center text-sm mt-1 text-red-800">
                            {errors.pincode.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Country"
                          className="w-full p-2 border rounded-md"
                          {...register("country", {
                            required: {
                              value: true,
                              message: "Country is required",
                            },
                          })}
                          name="country"
                        />
                        {errors.country && (
                          <p className="text-center text-sm mt-1 text-red-800">
                            {errors.country.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
                <Payment
                  setIsPayment={setIsPayment}
                  isPayment={isPayment}
                  products={{ products, data: formData, selected: false }}
                />
              </div>
            )}

            {/* Right Column */}
            <div>
              {/* Product Information Section */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">
                  Product Information
                </h2>
                <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                  {products?.product.map((product) => {
                    return (
                      <div className="flex items-center mb-4">
                        <img
                          src={product.image}
                          alt="Product"
                          className="w-12 h-12 object-cover rounded-md mr-4"
                        />
                        <div>
                          <p className="text-lg font-semibold">
                            {product.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {product.category}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <p className="text-lg font-semibold">
                            ₹ {product.price}
                          </p>
                          <p className="text-sm text-gray-600">
                            Quantity: {product.quantity}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Summary Section */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="bg-gray-50 rounded-md shadow-sm m flex justify-between">
                  <p className="text-lg">Total:</p>
                  <p className="text-lg">₹ {products?.total}</p>
                </div>
                <div className="bg-gray-50 rounded-md shadow-sm m flex justify-between">
                  <p className="text-lg">Delivery Charge:</p>
                  {/* <p className="text-lg">
                  {products?.total > 500 ? "Free Delivery"}
                </p> */}
                </div>
              </div>

              <button
                onClick={handleForm}
                className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
              >
                Pay ₹{products?.total}
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default CheckoutPage;
