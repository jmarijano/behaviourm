import axios from "axios";

const axionInstance = axios.create({
  baseURL: "http://localhost:5000",
});



export default axionInstance;
