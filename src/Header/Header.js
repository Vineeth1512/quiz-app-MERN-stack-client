import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function Header() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const localStateValue = JSON.parse(localStorage.getItem("isLoggedIn"));

  const handleHamburg = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const displayQuestions = () => {
    if (localStateValue) {
      if (user.role === 1) {
        return (
          <>
            <li>
              <Link to={"/createQuiz"}>Add New Question</Link>
            </li>
            <li>
              <Link to={"/displayQuiz"}>All Questions</Link>
            </li>
          </>
        );
      } else {
        return (
          <>
            <li>
              <Link to={"/startQuiz"}>Start Exam</Link>
            </li>
          </>
        );
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn", false);

    navigate("/login");
  };

  return (
    <React.Fragment>
      <header>
        <div class="container">
          <div class="logo">
            {" "}
            <Link to={"/"}>QuizHut</Link>
          </div>

          <nav>
            <ul>
              {displayQuestions()}
              {user ? (
                <>
                  <li>
                    <a>{user.name}</a>
                  </li>

                  <li>
                    {" "}
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li>
                    <Link to={"/login"}>Login</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          <div class="hamburger" id="hamburger" onClick={handleHamburg}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>
      <div
        className={`sidebar ${sidebarVisible ? "show" : "hide"}`}
        id="sidebar"
      >
        <nav>
          <ul>
            {displayQuestions()}
            {user ? (
              <>
                <li>
                  <a>{user.name}</a>
                </li>

                <li>
                  {" "}
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
}

export default Header;
