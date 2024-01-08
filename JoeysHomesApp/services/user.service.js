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

export async function getMaintenance(id) {

  const url = id ? `/maintenance/${id}` : "/maintenance"
  
  //const res = await fetch(url)
  const res = await api.get(url);

  if (!res.status == 200) {
      throw {
          message: "Failed to fetch maintenance tasks",
          statusText: res.statusText,
          status: res.status,
      }
  }

  console.log(res)
  
  //const data = await res.json()
  const data = await JSON.parse(res.data)

  return data
}


const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard
};

export default UserService;
