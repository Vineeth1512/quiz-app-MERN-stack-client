import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./startExam.css";
import Usersevice from "../service/quiz.service";
import { useNavigate } from "react-router-dom";
function StartExam() {
  const [questionData, setQuestionData] = useState();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectdOptions] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    Usersevice.getAllQuestions().then((response) => {
      setQuestionData(response.data.questions);
    });
  }, []);
  if (!questionData || questionData.length === 0) {
    return <div>Loading...</div>;
  }
  const firstQuestion = questionData[currentQuestionIndex];

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const handleNext = () => {
    if (currentQuestionIndex < questionData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  const hanleOptionChange = (questionId, value) => {
    setSelectdOptions({ ...selectedOptions, [questionId]: value });
    setAnsweredQuestions({ ...answeredQuestions, [questionId]: true });
  };
  const calculateScore = () => {
    let count = 0;

    questionData.forEach((question) => {
      const selectedAnswer = selectedOptions[question._id];
      const correctAnswer = parseInt(question.answer);

      if (selectedAnswer !== undefined && selectedAnswer === correctAnswer) {
        count++;
      }
    });
    setSelectdOptions({});
    navigate("/endExam", {
      state: { score: count, total: questionData.length },
    });
  };

  return (
    <>
      <Header></Header>
      <div className="single-question-wrapper">
        <div className="single-question">
          <div>
            <h3>
              {currentQuestionIndex + 1}. {firstQuestion.question}
            </h3>
            {firstQuestion.options.map((option, optionIndex) => (
              <div className="options-wrapper" key={optionIndex + 1}>
                <label>
                  <input
                    type="radio"
                    name={`q${firstQuestion._id}`}
                    checked={selectedOptions[firstQuestion._id] === optionIndex}
                    onChange={() =>
                      hanleOptionChange(firstQuestion._id, optionIndex)
                    }
                  />
                  <span>{option}</span>
                </label>
                <br />
              </div>
            ))}
          </div>
          <div className="update-btn">
            <button
              className="btn-btn"
              disabled={currentQuestionIndex === 0}
              onClick={handlePrevious}
            >
              Previous
            </button>
            {currentQuestionIndex === questionData.length - 1 ? (
              <button className="btn-btn" onClick={calculateScore}>
                Submit
              </button>
            ) : (
              <button
                className="btn-btn"
                onClick={handleNext}
                disabled={currentQuestionIndex === questionData.length - 1}
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div className="list-wrapper">
          {questionData.map((_, index) => {
            const isActive = index === currentQuestionIndex;
            const isAnswered = answeredQuestions[questionData[index]._id];
            return (
              <div
                key={index}
                className={`list-item ${isActive ? "active" : ""} ${
                  isAnswered ? "answered" : ""
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                <span>{index + 1}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default StartExam;
