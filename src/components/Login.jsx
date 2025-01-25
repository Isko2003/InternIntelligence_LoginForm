import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import "../App.css";
import app from "../../firebase";
import Swal from "sweetalert2";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const auth = getAuth();

  const handleCheckboxChange = () => {
    setRememberMe((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      if (
        formData.username === "" ||
        formData.email === "" ||
        formData.password === ""
      ) {
        setError("All fields should be filled");
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        await updateProfile(userCredential.user, {
          displayName: formData.username,
        });
        setError("");
        Swal.fire({
          text: "Sign Up Successfull",
          icon: "success",
          confirmButtonText: "Ok",
        });
        setFormData({
          username: "",
          email: "",
          password: "",
        });
      } catch (err) {
        setError(err.message);
      }
    } else {
      if (formData.email === "" || formData.password === "") {
        setError("Email and password are required");
        return;
      }
      try {
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        setError("");
        if (rememberMe) {
          localStorage.setItem("rememberMe", true);
        } else {
          localStorage.removeItem("rememberMe");
        }
        Swal.fire({
          text: "Sign In Successfull",
          icon: "success",
          confirmButtonText: "Ok",
        });
        setRememberMe(false);

        rememberMe
          ? setFormData({
              email: formData.email,
              password: "",
            })
          : setFormData({
              email: "",
              password: "",
            });
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleView = () => {
    setIsSignUp(!isSignUp);
    setError("");
  };

  return (
    <div className="w-[85%] flex justify-center items-center h-[100vh] mx-auto bg-white">
      <div className="left-banner w-[50%] h-[100vh]">
        <img
          src="/imgs/form-img.webp"
          alt="form-img"
          className={`h-[100%] object-cover ${
            isSignUp ? "order-[1] sign-up-change" : "order-[0]"
          }`}
        />
      </div>
      <div
        className={`right-banner w-[50%] ps-12 h-[100vh] ${
          isSignUp ? "order-[-1]" : "order-1"
        }`}
      >
        <div className="login-form-wrapper flex items-center h-[100vh] bg-white">
          <div className="login-form w-[85%]">
            <h1 className="font-bold text-3xl pb-2">
              {isSignUp ? "Sign Up" : "Log In"}
            </h1>
            <p className="text-gray-500 w-[75%] text-sm">
              Enter your email and password to {isSignUp ? "sign up" : "log in"}{" "}
              to our dashboard
            </p>
            {error && <p className="text-red-500">{error}</p>}
            <form className="pt-2 pb-2" onSubmit={handleSubmit}>
              {isSignUp && (
                <div>
                  <label htmlFor="username">Username</label>
                  <br />
                  <input
                    id="username"
                    type="text"
                    name="username"
                    className="outline-purple-300 border border-gray-400 w-[75%] p-1"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="email-input pb-2">
                <label htmlFor="email">Emaill</label>
                <br />
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="outline-purple-300 border border-gray-400 w-[75%] p-1"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="password-input pb-2">
                <label htmlFor="password">Password</label>
                <br />
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="outline-purple-300 border border-gray-400 w-[75%] p-1"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {!isSignUp && (
                <div>
                  <input
                    name="checkbox"
                    id="checkbox"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="checkbox">Remember me</label>
                </div>
              )}
              <div className="sign-in-btn">
                {isSignUp ? (
                  <button
                    className="bg-purple-500 text-white cursor-pointer p-2 w-[75%]"
                    type="submit"
                  >
                    Sign Up
                  </button>
                ) : (
                  <button
                    className="bg-purple-500 text-white cursor-pointer p-2 w-[75%]"
                    type="submit"
                  >
                    Sign In
                  </button>
                )}
              </div>
            </form>
            <div className="flex gap-4 pb-3">
              <span>
                {isSignUp
                  ? "Already have an account ? "
                  : "Don't have an account?"}
              </span>
              <button
                className="text-purple-600 cursor-pointer underline-none"
                onClick={toggleView}
                type="button"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </div>
            <div className="forgot-password text-purple-600">
              <a href="">{isSignUp ? "" : "Forgot Password ?"}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
