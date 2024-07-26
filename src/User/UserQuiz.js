import React from "react";
import Header from "../Header/Header";
import { Link } from "react-router-dom";
import "./UserQuiz.css";
function UserQuiz() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Header></Header>

      <div className="welcome-user-home-page">
        <div className="content-wrapper">
          <div className="wel-wrap">
            <h1 className="user-name">Welcome {user.name}</h1>
            <h1>You Can Start the Exam here..!</h1>
            <div className="btn-wrap">
              <button>
                <Link to={"/startExam"}>Start Exam</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserQuiz;
