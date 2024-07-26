import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthService from "../service/auth.sevice";

function ResetPassword() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
      console.log(email);
    } else {
      toast.error("No email provided");
      navigate("/forgetPassword");
    }
  }, [location.state, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        toast.error("password and confirmPassword does not match..!");
      } else {
        const response = await AuthService.ResetPassword({
          email,
          password,
          confirmPassword,
        });

        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
      console.log(err);
    }
  };

  return (
    <>
      <Header></Header>
      <div className="main-container">
        <Toaster />

        <div className="form-wrapper">
          <div className="secondary-section">
            <h2>Reset Password Here..!</h2>
            {/*  */}
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="input-field">
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly
                />
              </div>
              <div className="input-field">
                <label>New Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your New Password"
                  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  // title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
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
                  //pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  // title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter Your Confirm Password"
                  required
                />
              </div>

              <div className="button-sec">
                <button className="signup-btn">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
