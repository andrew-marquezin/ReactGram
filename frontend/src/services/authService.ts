import type { LoginUserType, RegisterUserType } from "../Types/apiTypes";
import { api, requestConfig } from "../utils/config";

const register = async (data: RegisterUserType) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/register", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res._id) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (e) {
    console.log(e);
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const login = async (data: LoginUserType) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/login", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res._id) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (e) {
    console.log(e);
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
