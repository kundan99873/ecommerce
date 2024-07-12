import React, { useEffect, useState } from "react";
import { getUserAddress } from "../api/apiService";
import { useNavigate } from "react-router-dom";

export default function CheckoutAddress() {
  const navigate = useNavigate();
  const [address, setAddress] = useState();
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    const getaddress = async () => {
      const data = await getUserAddress();
      setAddress(data.address);
    };
    getaddress();
    setFetch(false);
  }, [fetch]);

  return (
    <div>
      {address ? (
        <div className="mx-auto p-4 cursor-pointer w-full">
          <div className="flex flex-wrap  gap-6">
            {address.map((data, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white rounded-lg max-w-72 shadow-md p-4 "
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
      ) : (
        <p className="text-gray-600">No Saved Address</p>
      )}
    </div>
  );
}
