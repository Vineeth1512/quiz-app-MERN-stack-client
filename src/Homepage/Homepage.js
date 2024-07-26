import React from "react";
import Header from "../Header/Header";
import "./Homepage.css";
function Homepage() {
  return (
    <>
      <Header></Header>
      <div className="wrapper">
        <div className="home-wrapper">
          <h1>QuizHut</h1>
          <h4> A simple quiz system for gaining knowledge purpose.</h4>
        </div>
      </div>
    </>
  );
}

export default Homepage;
