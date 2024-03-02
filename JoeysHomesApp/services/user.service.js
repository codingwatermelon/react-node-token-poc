import api from "./api";

const getPublicContent = () => {
  return api.get("/test/all");
};

const getUserBoard = () => {
  return api.get("/test/user");
};

const getModeratorBoard = () => {
  return api.get("/test/mod");
};

const getAdminBoard = () => {
  return api.get("/test/admin");
};

export async function getListings(endpoint, id) {

  const url = id ? `/${endpoint}/${id}` : `/${endpoint}`
  const res = await api.get(url);

  if (!res.status == 200) {
      throw {
          message: `Failed to fetch listing of ${endpoint}`,
          statusText: res.statusText,
          status: res.status,
      }
  }

  const data = await res.data;
  return data
}

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard
};

export default UserService;
