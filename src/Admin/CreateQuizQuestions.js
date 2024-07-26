import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./createQuiz.css";
import axios from "axios";
import QuizService from "../service/quiz.service";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function CreateQuizQuestions() {
  const [id, setId] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { questionId } = useParams();

  useEffect(() => {
    if (questionId) {
      setLoading(true);
      QuizService.getQuestionById(questionId)
        .then((response) => {
          const questionData = response.data.question;
          console.log(response.data);
          setId(questionData._id);
          setQuestion(questionData.question);
          setAnswer(questionData.answer);
          setOption1(questionData.options[0]);
          setOption2(questionData.options[1]);
          setOption3(questionData.options[2]);
          setOption4(questionData.options[3]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [questionId]);

  const resetForm = () => {
    setId("");
    setQuestion("");
    setAnswer("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const questions = {
      question,
      answer,
      options: [option1, option2, option3, option4],
    };

    try {
      let response;
      if (id) {
        response = await QuizService.updateQuestion(id, questions);
        setTimeout(() => {
          toast.success(response.data.message);
          navigate("/displayQuiz");
        }, 2000);
      } else {
        response = await QuizService.createQuestion(questions);
        resetForm();
      }
      toast.success(response.data.message);

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header></Header>
      <Toaster />

      <div className="main-container">
        <div className="form-wrapper-for-create">
          <div className="secondary-section">
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="input-field">
                <label>Question:</label>
                <input
                  type="text"
                  id="question"
                  name="question"
                  placeholder="Enter Your Question"
                  required
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <div className="input-field">
                <label>Option 1:</label>
                <input
                  type="text"
                  id="option1"
                  name="option1"
                  placeholder="Enter Your option 1"
                  required
                  value={option1}
                  onChange={(e) => setOption1(e.target.value)}
                />
              </div>
              <div className="input-field">
                <label>Option 2:</label>
                <input
                  type="text"
                  id="option2"
                  name="option2"
                  placeholder="Enter Your option 2"
                  required
                  value={option2}
                  onChange={(e) => setOption2(e.target.value)}
                />
              </div>
              <div className="input-field">
                <label>Option 3:</label>
                <input
                  type="text"
                  id="option3"
                  name="option3"
                  placeholder="Enter Your option 3"
                  required
                  value={option3}
                  onChange={(e) => setOption3(e.target.value)}
                />
              </div>
              <div className="input-field">
                <label>Option 4:</label>
                <input
                  type="text"
                  id="option4"
                  name="option4"
                  placeholder="Enter Your option 4"
                  required
                  value={option4}
                  onChange={(e) => setOption4(e.target.value)}
                  // autocomplete="off"
                />
              </div>
              <div className="input-field">
                <label>Answer</label>
                <input
                  type="number"
                  id="answer"
                  name="answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Enter Your Correct Answer Based on options Index"
                  required
                />
              </div>

              <div className="button-sec">
                <button className="signin-btn">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateQuizQuestions;
