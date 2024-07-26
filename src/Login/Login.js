import React, { useState } from "react";
import Header from "../Header/Header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import authSevice from "../service/auth.sevice";
function Login({ setIsLoggedIn }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authSevice.Login(data);
      // const response = await axios.post(
      //   "http://localhost:3002/auth/login",
      //   data
      // );
      //console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("isLoggedIn", true);
      setIsLoggedIn(true);
      toast.success(response.data.message);

      if (response.data.user.role === 1) {
        navigate("/createQuiz");
      } else {
        navigate("/startQuiz");
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  const onFormAction = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />
      <Toaster />

      <div className="main-container">
        <div className="form-wrapper">
          <div className="secondary-section">
            <h2>Login here..!</h2>
            <form onSubmit={onSubmit}>
              <div className="input-field">
                <label>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Your Email"
                  required
                  value={data.email}
                  onChange={onFormAction}
                  autoComplete="off"
                />
              </div>
              <div className="input-field">
                <label>Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={data.password}
                  onChange={onFormAction}
                  placeholder="Enter Your Password"
                  required
                />
              </div>
              <div className="forget-password">
                <label>
                  <Link to="/forgetPassword">Forget Password</Link>
                </label>
              </div>

              <div className="button-sec">
                <button type="submit" className="signin-btn">
                  Sign in
                </button>
                <button className="signup-btn">
                  <Link to="/signup">Sign Up</Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
