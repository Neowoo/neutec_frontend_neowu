import axios from "axios";

axios.defaults.baseURL = "https://api.github.com/";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.post["Access-Control-Allow-header"] = "*";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default axios;
