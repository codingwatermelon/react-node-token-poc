import api from "./api";
import { redirect } from "react-router-dom"

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

  //const data = await res.json()
  const data = await res.data;
  return data
}

// TODO How do I verify the token is not expired
export async function requireAuth(request) {
    const pathname = new URL(request.url).pathname
    // TODO verify that token is not expired and sufficient to access the requested resource
    const res = await api.get("/verifyauth");
    console.log("requireauth res")
    console.log(res)

    if (!res) {
        throw redirect(
            `/login?message=You must log in first.&redirectTo=${pathname}`
        )
    }
}



const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard
};

export default UserService;
