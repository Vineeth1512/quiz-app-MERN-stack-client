import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function UpdateUestions() {
  const { questionId } = useParams();
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:3002/admin/getQuestion/${questionId}`)
      .then((response) => {
        const questionData = response.data.getQusetionById;

        setQuestion(questionData.question);
        setOption1(questionData.options[0]);
        setOption2(questionData.options[1]);
        setOption3(questionData.options[2]);
        setOption4(questionData.options[3]);
        setAnswer(questionData.answer);
      })
      .catch((error) =>
        console.error("Error fetching question details:", error)
      );
  }, [questionId]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const updateQuestion = {
      question,
      answer,
      options: [option1, option2, option3, option4],
    };

    axios
      .put(
        `http://localhost:3002/admin/updateQuestion/${questionId}`,
        updateQuestion
      )
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Header></Header>
      <Toaster />

      <h1>Admin Will Update Questions Here...!</h1>
      <div className="section-wrapper">
        <div className="post-question-wrapper">
          {/* // */}
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
                // autocomplete="off"
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
                placeholder="Enter Your Correct Answer"
                required
              />
            </div>

            <div className="button-sec">
              <button className="signin-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateUestions;
