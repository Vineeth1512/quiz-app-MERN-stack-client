import axios from "axios";

const ADMIN_API_URL = `https://quiz-app-mern-stack-server.vercel.app/admin`;
class QuizService {
  getAllQuestions() {
    return axios.get(`${ADMIN_API_URL}/getAllQuestions`);
  }
  createQuestion(user) {
    return axios.post(`${ADMIN_API_URL}/createQuestions`, user);
  }
  updateQuestion(questionId, question) {
    return axios.put(`${ADMIN_API_URL}/updateQuestion/${questionId}`, question);
  }
  getQuestionById(questionId) {
    return axios.get(`${ADMIN_API_URL}/getQuestion/${questionId}`);
  }
  deleteQuestion(questionId) {
    return axios.delete(`${ADMIN_API_URL}/deleteQuestion/${questionId}`);
  }
}
export default new QuizService();
