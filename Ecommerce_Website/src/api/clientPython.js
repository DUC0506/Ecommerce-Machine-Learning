import axios from "axios";
console.log(process.env.REACT_APP_BASE_URL_PYTHON);
const clientPyThon = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL_PYTHON,
});
export default clientPyThon;
