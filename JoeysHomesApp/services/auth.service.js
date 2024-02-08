import api from "./api";
import TokenService from "./token.service";

const register = (username, email, password) => {
  return api.post("/auth/signup", {
    username,
    email,
    password
  });
};

const login = (username, password) => {

  return api
    .post("/auth/signin", {
      username,
      password
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }

      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// Add generic call to Axios in order to update access token if it is expired and set auth status accordingly
const getAuthStatus = () => {
  return api
    .get("/auth/authstatus")
    .then((response) => {
      return response.data;
    });
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getAuthStatus
};

export default AuthService;
