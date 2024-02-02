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
  const { isAuthenticated, changeHeader } = useContext(AuthContext);

  return api
    .post("/auth/signin", {
      username,
      password
    })
    .then((response) => {
      if (response.data.accessToken) {
        TokenService.setUser(response.data);
      }
      changeHeader()

      return response.data;
    });
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
