import React from "react";
import Header from "../Header/Header";
import { useLocation } from "react-router-dom";

function EndExam() {
  const location = useLocation();
  const score = location.state?.score;
  const total = location.state?.total;
  return (
    <>
      <Header></Header>
      <div className="complete-exam">
        <h1>Successfully Completed Your Exam.. </h1>
        <h3>
          Your Score is :{score}/{total}
        </h3>
      </div>
    </>
  );
}

export default EndExam;
