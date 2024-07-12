import React, { useState } from "react";
import { useSelector } from "react-redux";
import Password from "./ChangePassword";
import UpdateUser from "./UpdateUser";

export default function Account() {
  const { user } = useSelector((state) => state.user);
  const [text, setText] = useState(false);
  const [name, setName] = useState(user.name);
  const [ChangePassword, setChangePassword] = useState(false);
  const [updateUser, setUpdateUser] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {ChangePassword || updateUser ? (
        <>
          {ChangePassword && <Password data={setChangePassword} />}
          {updateUser && <UpdateUser data={setUpdateUser} />}
        </>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">Account Information</h2>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <div className="flex justify-center items-center">
              <div className="relative">
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
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-1">
                Full Name
              </label>
              <div className="flex items-center gap-3">
                {text ? (
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                ) : (
                  <p className="text-gray-600">{user.name}</p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-1">
                Email ID
              </label>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-1">
                Password
              </label>
              <div className="flex gap-4 items-center">
                <p className="text-gray-600">********</p>
                <button
                  onClick={() => setChangePassword(true)}
                  className="bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600 cursor-pointer"
                >
                  Change Password
                </button>
              </div>
            </div>

            <button
              className="bg-blue-500 text-white rounded-full py-2 px-4 hover:bg-blue-600 cursor-pointer"
              onClick={() => setUpdateUser(true)}
            >
              Edit Account Detail
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
