import api from "./api";
import TokenService from "./token.service";
import { AuthContext } from '../components/common/AuthContext';

const register = (username, email, password) => {
  return api.post("/auth/signup", {
    username,
    email,
    password
  });
};


// TODO Set isauthenticated here?

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
    // TODO Add error response here
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
