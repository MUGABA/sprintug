import axios from "axios";

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

const obj = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt,
};

export default obj;
