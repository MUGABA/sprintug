import jwtDecode from "jwt-decode";
import http from "./httpService";

export const authorize = async (route, authData) => {
  const { data } = await http.post(route, authData);

  const { token: jwt } = data;

  localStorage.setItem("token", jwt);

  http.setJwt(jwt);

  const user = jwtDecode(jwt);

  const obj = {
    ...user,
    ...data.data,
    userToken: jwt,
  };

  localStorage.setItem("user", JSON.stringify(obj));

  return obj;
};

function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

function getJwt() {
  return localStorage.getItem("token");
}

http.setJwt(getJwt());

export function logOut() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
}

export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);

    return user;
  } catch (er) {
    return null;
  }
};

const obj = {
  loginWithJwt,
  logOut,
  getCurrentUser,
  getJwt,
};

export default obj;
