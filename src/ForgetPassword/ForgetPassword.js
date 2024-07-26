import React, { useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthService from "../service/auth.sevice";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await AuthService.ForgetPassword({ email });
      // axios.post("http://localhost:3002/auth/forgetPassword", { email });

      navigate("/resetPassword", { state: { email: email } });
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };
  const onFormAction = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Header></Header>
      <Toaster />

      <div className="main-container">
        <div className="form-wrapper">
          <div className="secondary-section">
            <h2>Reset Password here..!</h2>
            <form onSubmit={onSubmit}>
              <div className="input-field">
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  required
                  value={email}
                  onChange={onFormAction}
                />
              </div>

              <div className="button-sec">
                <button type="submit" className="signin-btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
