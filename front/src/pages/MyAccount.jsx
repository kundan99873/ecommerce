import React, { useState } from "react";
import { useSelector } from "react-redux";
import Wishlist from "../components/Wishlist";
import Address from "../components/Address";
import { FaUser } from "react-icons/fa";
import Account from "../components/Account";
import Loading from "../components/Loading";

const AccountPage = () => {
  const [selectedTab, setSelectedTab] = useState("myaccount");
  const { user } = useSelector((state) => state.user);
  return (
    <>
      {!user ? (
        <Loading />
      ) : (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
          <aside className="w-full md:w-1/4 bg-white shadow-md p-4">
            <div className="flex flex-col items-center md:items-start">
              {user?.image ? (
                <img
                  src={user?.image?.url}
                  alt=""
                  height={100}
                  width={100}
                  className="rounded-full cursor-pointer"
                />
              ) : (
                <div className="bg-blue-500 rounded-full w-24 h-24 flex items-center justify-center text-white text-4xl mb-4">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              {/* <p className="text-gray-500 mb-6">+91-8779253883</p> */}
            </div>
            <div className="mt-6">
              <ul className="hidden md:block">
                <li
                  className="flex items-center p-2 gap-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={() => setSelectedTab("myaccount")}
                >
                  <FaUser className="mr-2" size={24} />
                  My Account
                </li>
                <li
                  className="flex items-center p-2 gap-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={() => setSelectedTab("addressManagement")}
                >
                  <FaUser className="mr-2" size={24} />
                  Address Manangement
                </li>
                <li
                  className="flex items-center p-2 gap-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={() => setSelectedTab("wishlist")}
                >
                  <FaUser className="mr-2" size={24} />
                  My Wishlist
                </li>
              </ul>
            </div>
            <div className="mt-6 border-t-2 ">
              <ul className="md:hidden flex gap-2 overflow-x-auto scrollbar-hide mb-6 mx-2">
                <li
                  className="flex flex-col justify-center items-center text-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={() => setSelectedTab("myaccount")}
                >
                  <FaUser size={20} />
                  My Account
                </li>
                <li
                  className="flex flex-col justify-center items-center text-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={() => setSelectedTab("addressManagement")}
                >
                  <FaUser size={20} />
                  Address Managemant
                </li>
                <li
                  className="flex flex-col justify-center items-center text-center p-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
                  onClick={() => setSelectedTab("wishlist")}
                >
                  <FaUser size={20} />
                  My Wishlist
                </li>
              </ul>
            </div>
          </aside>
          <main className="flex-grow p-4">
            {selectedTab == "myaccount" && <Account />}
            {selectedTab === "addressManagement" && <Address />}
            {selectedTab === "wishlist" && <Wishlist />}
            {selectedTab === "editAccount" && <Account />}
          </main>
        </div>
      )}
    </>
  );
};

export default AccountPage;

// const MyAccount = () => {
//   const [selectedTab, setSelectedTab] = useState("accountDetails");
//   const auth = useSelector((state) => state.user);

//   const fileInputRef = useRef(null);

//   const handleClick = () => {
//     fileInputRef.current.click();
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-6">My Account</h1>

//       <div className="flex overflow-x-auto scrollbar-hide mb-6 mx-2">
//         <button
//           className={`p-2 mx-2 ${
//             selectedTab === "accountDetails" ? "border-b-2 border-blue-500" : ""
//           }`}
//           onClick={() => setSelectedTab("accountDetails")}
//         >
//           Account Details
//         </button>
//         <button
//           className={`p-2 mx-2 ${
//             selectedTab === "addressManagement"
//               ? "border-b-2 border-blue-500"
//               : ""
//           }`}
//           onClick={() => setSelectedTab("addressManagement")}
//         >
//           Address Management
//         </button>
//         <button
//           className={`p-2 mx-2 ${
//             selectedTab === "wishlist" ? "border-b-2 border-blue-500" : ""
//           }`}
//           onClick={() => setSelectedTab("wishlist")}
//         >
//           Wishlist
//         </button>
//       </div>

//       <div className="bg-white p-4 shadow rounded">
//         {selectedTab === "accountDetails" && (
//           <div>
//             <h2 className="text-xl font-semibold mb-4">Account Details</h2>
//             <div className="flex justify-center">
//               {auth?.user?.image ? (
//                 <img
//                   src={auth?.user?.image?.url}
//                   alt=""
//                   height={100}
//                   width={100}
//                   className="rounded-full cursor-pointer"
//                   onClick={() =>
//                     isOpenUser ? setIsOpenUser(false) : setIsOpenUser(true)
//                   }
//                 />
//               ) : (
//                 <div className="relative">
//                   <p
//                     className="bg-red-600 h-28 w-28 text-center px-2 text-8xl rounded-full text-white text-bold cursor-pointer"
//                     onClick={handleClick}
//                   >
//                     {auth.user?.name.charAt(0).toUpperCase()}{" "}
//                   </p>
//                   <input
//                     type="file"
//                     accept="/.jpg /.jpeg /.png"
//                     ref={fileInputRef}
//                     className="hidden"
//                   />
//                   <MdEdit className="absolute right-0 top-2" size={30} />
//                 </div>
//               )}
//             </div>
//             <p className="text-gray-600">Name: John Doe</p>
//             <p className="text-gray-600">Email: johndoe@example.com</p>
//             <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
//               Edit Details
//             </button>
//           </div>
//         )}

//         {selectedTab === "addressManagement" && <Address />}

//         {selectedTab === "wishlist" && <Wishlist />}
//       </div>
//     </div>
//   );
// };

// export default MyAccount;
