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

const submitPasswordReset = (email) => {
  return api.post("/auth/submitpasswordreset", {
    email
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// Add generic call to Axios in order to update access token if it is expired and set auth status accordingly
const getAuthStatus = () => {
  return api
    .get("/auth/authstatus")
    .then((response) => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};



const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getAuthStatus,
  submitPasswordReset
};

export default AuthService;
