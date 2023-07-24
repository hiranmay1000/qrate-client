import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { HiChevronDoubleRight, HiUserAdd } from "react-icons/hi";

import "react-toastify/dist/ReactToastify.css";
import "./signup.scss";

const api_url = process.env.REACT_APP_API_URL;

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    cpassword: "",
  });

  const [errFields, setErrFields] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    setFieldErrors((prevFieldErrors) => ({
      ...prevFieldErrors,
      [name]: "",
    }));
  };

  const handleUserSignup = async (e) => {
    e.preventDefault();

    try {
      if (formData.password !== formData.cpassword) {
        setFieldErrors((prevFieldErrors) => ({
          ...prevFieldErrors,
          password: "active",
        }));
        toast.warning("Password does not match!");
        return;
      }

      const response = await axios.post(`${api_url}/auth/signup`, formData);
      const statusCode = response.status;

      if (statusCode === 201) {
        toast.success(`Account created successfully!`);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      if (error.response?.data?.msg) {
        setErrFields(error.response.data.errFields);
        toast.warning(error.response.data.msg);
      } else {
        toast.warning("An error occurred. Please try again later.");
      }
    }
  };

  useEffect(() => {
    const fieldErrorMap = {};
    errFields.forEach((errField) => {
      fieldErrorMap[errField] = "active";
    });
    setFieldErrors(fieldErrorMap);
  }, [errFields]);

  const handleRedirectLoginBtn = () => {
    navigate("/login");
  };

  return (
    <>
      <div id="signup-container">
        <div className="signup-container">
          <div className="signup-box">
            <form onSubmit={handleUserSignup} action="">
              <h2>Register Yourself</h2>
              <input
                onChange={handleInputChange}
                type="text"
                name="name"
                className={`isEmptyInputFields ${fieldErrors.name}`}
                id="name"
                placeholder="Name"
              />
              <input
                onChange={handleInputChange}
                type="email"
                name="email"
                className={`isEmptyInputFields ${fieldErrors.email}`}
                id="email"
                placeholder="Email"
              />
              <input
                onChange={handleInputChange}
                type="text"
                name="username"
                className={`isEmptyInputFields ${fieldErrors.username}`}
                id="username"
                placeholder="Username"
              />
              <input
                onChange={handleInputChange}
                type="password"
                name="password"
                className={`isEmptyInputFields ${fieldErrors.password}`}
                id="password"
                placeholder="Password"
              />
              <input
                onChange={handleInputChange}
                type="password"
                name="cpassword"
                className={`isEmptyInputFields ${fieldErrors.password}`}
                id="cpassword"
                placeholder="Confirm Password"
              />
              <button type="submit">
                Register <HiUserAdd />
              </button>
            </form>
          </div>
          <div className="signup-img-banner">
            <div className="signup-img-banner-wrapper">
              <h2>Already a Ratera user?</h2>
              <p>
                Welcome to Ratera community <br /> Happy rating
              </p>
              <button onClick={handleRedirectLoginBtn} type="button">
                Login <HiChevronDoubleRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer hideProgressBar newestOnTop={true} theme="dark" />
    </>
  );
};

export default Signup;
