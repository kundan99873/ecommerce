import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { addAddress, addnewOrder } from "../api/apiService";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCartItem } from "../redux/cart/userCartSlice";

const PaymentForm = ({ products, isPayment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const product = [];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  products?.products?.product?.map((p) =>
    product.push({ product_id: p.id, quantity: p.quantity })
  );

  const address = {
    firstName: products.data.firstName,
    lastName: products.data.lastName,
    email: products.data.email,
    contact: products.data.contact,
    city: products.data.city,
    state: products.data.state,
    address1: products.data.address1,
    address2: products.data?.address2,
    pincode: products.data.pincode,
    country: products.data.country,
  };

  const data = {
    name: products.data.firstName + " " + products.data.lastName,
    address:
      products.data.address1 +
      " " +
      products.data?.address2 +
      ", " +
      products.data.city +
      ", " +
      products.data.state +
      ", " +
      products.data.pincode,
    products: product,
    amount: products.products.total,
    contact: products.data.contact,
    paymentMethod: "Card",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173",
      },
      redirect: "if_required",
    });

    if (result.error) {
      setError(result.error.message);
      console.error(result.error.message);
      setProcessing(false);
    } else if (result.paymentIntent.status === "succeeded") {
      setSucceeded(true);
      setError(null);
      setProcessing(false);
      const order = await addnewOrder(data);
      // const address = await addAddress(data);
      if (order?.success) {
        if (!products.selected) {
          await addAddress(address);
        }
        toast.success("Your Order Placed Successfully...", {
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
        dispatch(deleteCartItem());
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } else {
      setError("Unexpected state");
      setProcessing(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg">
      <p></p>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement className="p-4 border rounded-lg mb-4" />
        <div className="flex gap-2">
          <button
            disabled={processing || succeeded}
            id="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <span id="button-text">
              {processing ? "Processing..." : `Pay ₹${products.products.total}`}
            </span>
          </button>
          <button
            onClick={() => isPayment(false)}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Cancel Payment
          </button>
        </div>
        {error && (
          <div className="card-error text-red-500 mt-2" role="alert">
            {error}
          </div>
        )}
        {succeeded && (
          <p className="result-message text-green-500 mt-2">
            Payment succeeded!
          </p>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
