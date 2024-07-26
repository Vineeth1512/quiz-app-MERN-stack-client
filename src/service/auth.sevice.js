import axios from "axios";
const USER_API_URL = "https://quiz-app-mern-stack-server.vercel.app/auth";

class AuthService {
  Signup(user) {
    return axios.post(`${USER_API_URL}/signup`, user);
  }
  Login(user) {
    return axios.post(`${USER_API_URL}/login`, user);
  }

  ForgetPassword(user) {
    return axios.post(`${USER_API_URL}/forgetPassword`, user);
  }
  ResetPassword(user) {
    return axios.post(`${USER_API_URL}/resetPassword`, user);
  }
}
export default new AuthService();
