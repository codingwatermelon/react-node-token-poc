import axios from "axios";
import TokenService from "./token.service";

const instance = axios.create({
  baseURL: "http://192.168.64.3:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    // TODO may need to change this path
    if (originalConfig.url !== "/auth/signin" && err.response) {
      if (originalConfig.url == "/auth/changepassword") {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          return instance(originalConfig)
        }
      }
      else {
        // if Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await instance.post("/auth/refreshtoken", {
              refreshToken: TokenService.getLocalRefreshToken(),
            });

            const { accessToken } = rs.data;
            TokenService.updateLocalAccessToken(accessToken);

            return instance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
