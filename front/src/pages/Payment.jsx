import { useEffect, useState } from "react";
import PaymentForm from "../components/Payment";
import { loadStripe } from "@stripe/stripe-js";
import { paymentApi } from "../api/apiService";
import { Elements } from "@stripe/react-stripe-js";
import Loading from "../components/Loading";

export default function Payment({ isPayment, setIsPayment, products }) {
  const stripePromise = loadStripe(
    "pk_test_51Mir2BSJfev21QuqJ8KQ4VpPq9W2h1Szd5oYgMh1p8Q8UtfHVeRc6AaOEcLID7nHlQ9ygNJB1cQiuc4CAjCrdzFp00EflQgn6h"
  );

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const createPaymentIntent = async () => {
      const data = await paymentApi(products.products.total * 100);
      setClientSecret(data.clientSecret);
    };

    createPaymentIntent();
  }, []);

  return (
    <>
      {isPayment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="min-h-screen flex justify-center items-center">
            {clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm products={products} isPayment={setIsPayment} />
              </Elements>
            ) : (
              <Loading />
            )}
          </div>
        </div>
      )}
    </>
  );
}
