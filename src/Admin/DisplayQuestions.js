import Header from "../Header/Header";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import QuizService from "../service/quiz.service";

function DisplayQuestions() {
  const [quizData, setQuizData] = useState([]);
  useEffect(() => {
    //for axios i created seperated file
    QuizService.getAllQuestions()
      .then((response) => {
        console.log(response.data.questions);
        setQuizData(response.data.questions);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteQuestion = (id) => {
    QuizService.deleteQuestion(id).then(() => {
      setQuizData((prev) => prev.filter((question) => question._id !== id));
    });
  };

  return (
    <>
      <Header></Header>

      <div className="section-wrapper">
        <div className="display-question-wrapper">
          {quizData.map((question, index) => {
            return (
              <div className="question-wrapper" key={index + 1}>
                <div>
                  <h3>
                    Q{index + 1}. {question.question}
                  </h3>
                  {question.options.map((option, optionIndex) => {
                    return (
                      <div className="options-wrapper" key={optionIndex + 1}>
                        <label>
                          <input type="radio" name={`q${optionIndex + 1}`} />
                          <span>{option}</span>
                        </label>
                        <br />
                      </div>
                    );
                  })}
                </div>
                <div className="update-btn">
                  <button className="btn-btn">
                    <Link to={`/updateQuestion/${question._id}`}>Update</Link>
                  </button>
                  <button
                    className="btn-btn"
                    onClick={() => deleteQuestion(question._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
          {/* <div className="question-wrapper">
            <h3>1. What is your National Bird.?</h3>
            <div className="options-wrapper">
              <label>
                <input type="radio" name="q1" />
                <span>Eagle</span>
              </label>
              <br />
              <label>
                <input type="radio" name="q1" />
                <span>Peacock</span>
              </label>
              <br />

              <label>
                <input type="radio" name="q1" />
                <span>ButterFly</span>
              </label>
              <br />

              <label>
                <input type="radio" name="q1" />
                <span>Huming bird</span>
              </label>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default DisplayQuestions;
