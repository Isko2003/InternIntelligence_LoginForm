import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccessMessage("Password reset email sent successfully!");
      setError("");
      Swal.fire({
        text: "Password reset email sent!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      setError(err.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="w-[100%] flex justify-center items-center h-[100vh] mx-auto bg-white">
      <div className="forgot-password-form w-[40%] bg-gray-100 p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold pb-4">Forgot Password</h1>
        <p className="text-gray-500 pb-4">
          Enter your email address and we will send you a password reset link.
        </p>
        {error && <p className="text-red-500">{error}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="email-input pb-4">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              id="email"
              className="outline-purple-300 border border-gray-400 w-full p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-purple-500 text-white w-full p-2 rounded hover:bg-purple-600 cursor-pointer"
          >
            Send Reset Email
          </button>
        </form>
        <Link to={"/"}>
          <div className="pt-4">
            <button className="bg-green-500 text-white mt-4 rounded cursor-pointer p-2">
              Go Back To the Sign In Form
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
