import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Dashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut();
    Swal.fire({
      title: "",
      text: "You're Logging Out :(",
      icon: "warning",
      confirmButtonText: "Ok",
    }).then(() => {
      navigate("/");
    });
    localStorage.removeItem("username");
  };
  let storedUserName = localStorage.getItem("username");

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
      <div className="container mx-auto py-10 px-6">
        <header className="flex justify-between items-center pb-8">
          <h1 className="text-3xl font-bold">
            {`Welcome To Your Dashboard, ${storedUserName}!`}
          </h1>
          <button
            className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </header>

        <main>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold">Profile</h2>
              <p className="text-sm text-gray-600">
                View and edit your personal profile details.
              </p>
              <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 cursor-pointer">
                Manage
              </button>
            </div>

            <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold">Analytics</h2>
              <p className="text-sm text-gray-600">
                Monitor your activities and performance.
              </p>
              <button className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 cursor-pointer">
                View
              </button>
            </div>

            <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold">Settings</h2>
              <p className="text-sm text-gray-600">
                Update your account settings and preferences.
              </p>
              <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer">
                Edit
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
