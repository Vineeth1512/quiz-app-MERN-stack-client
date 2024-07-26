import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage/Homepage";
import Signup from "./Register/Signup";
import Login from "./Login/Login";
import ForgetPassword from "./ForgetPassword/ForgetPassword";
import QuizHome from "./QuizHome/QuizHome";
import CreateQuizQuestions from "./Admin/CreateQuizQuestions";
import UserQuiz from "./User/UserQuiz";
import DisplayQuestions from "./Admin/DisplayQuestions";
import { useEffect, useState } from "react";
import Header from "./Header/Header";
import StartExam from "./User/StartExam";
import EndExam from "./User/EndExam";
import ResetPassword from "./ForgetPassword/ResetPassword";
//import UpdateUestions from "./Admin/UpdateUestions";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const localStateValue = JSON.parse(localStorage.getItem("isLoggedIn"));
    setIsLoggedIn(localStateValue === true);
  }, []);
  return (
    <>
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route
            path="/quizHome"
            element={isLoggedIn === true ? <QuizHome /> : <Navigate to="/" />}
          />

          <Route
            path="/createQuiz"
            element={
              isLoggedIn === true ? (
                <CreateQuizQuestions />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/updateQuestion/:questionId"
            element={
              isLoggedIn === true ? (
                <CreateQuizQuestions />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/displayQuiz"
            element={
              isLoggedIn === true ? <DisplayQuestions /> : <Navigate to="/" />
            }
          />
          <Route
            path="/startQuiz"
            element={isLoggedIn === true ? <UserQuiz /> : <Navigate to="/" />}
          />
          <Route
            path="/startExam"
            element={isLoggedIn === true ? <StartExam /> : <Navigate to="/" />}
          />
          <Route
            path="/endExam"
            element={isLoggedIn === true ? <EndExam /> : <Navigate to="/" />}
          />
          <Route
            path="*"
            element={
              <h2 style={{ marginTop: "100px", textAlign: "center" }}>
                404 Page not found.
              </h2>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
