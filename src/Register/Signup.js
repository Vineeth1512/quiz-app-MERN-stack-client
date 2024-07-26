import React from "react";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import AuthService from "../service/auth.sevice";

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = user;
  const onFormAction = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("password and confirmPassword does not match..!");
    } else {
      try {
        // for axios i created new file
        const response = await AuthService.Signup(user);
        //console.log(response.data);

        setTimeout(() => {
          toast.success(response.data.message);
        }, 1000);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <Header></Header>
      <div className="main-container">
        <Toaster />

        <div className="form-wrapper">
          <div className="secondary-section">
            <h2>Create Your Account</h2>

            <form onSubmit={(e) => onSubmit(e)}>
              <div className="input-field">
                <label>Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => onFormAction(e)}
                  required
                />
              </div>
              <div className="input-field">
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  required
                  value={email}
                  onChange={(e) => onFormAction(e)}
                  autocomplete="off"
                />
              </div>
              <div className="input-field">
                <label>Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => onFormAction(e)}
                  placeholder="Enter Your Password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                  required
                />
              </div>
              <div className="input-field">
                <label>Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirmPassword"
                  value={confirmPassword}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                  onChange={(e) => onFormAction(e)}
                  placeholder="Enter Your Confirm Password"
                  required
                />
                {/* {error && (
                  <p className="error-message" style={{ color: "red" }}>
                    {error}
                  </p>
                )} */}
              </div>
              {/* <div className="input-field">
                <label>Mobile Number</label>
                <input
                  type="number"
                  id="mobile"
                  //value={mobile}
                  name="mobile"
                  // onChange={(e) => onFormAction(e)}
                  placeholder="Enter Your Mobile Number"
                  required
                />
              </div> */}

              <div className="agree-sec">
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  placeholder="Enter Your Password"
                  required
                />
                <label>
                  I agree to the{" "}
                  <a className="terms" href="#">
                    Terms and Conditions
                  </a>
                </label>
              </div>
              <div className="button-sec">
                <button className="signup-btn">Sign up</button>
                <button className="signin-btn">
                  <Link to={"/login"}>Sign in</Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
