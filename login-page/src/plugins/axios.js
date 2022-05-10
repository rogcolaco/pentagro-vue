import axios from "axios";

const $http = axios.create({
 baseURL: "http://186.237.58.167:65129/api/user/",
});

export default $http