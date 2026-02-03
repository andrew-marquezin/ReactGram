import { api, requestConfig } from "../utils/config";

const profile = async (data: any, token: string) => {
  const config = requestConfig("GET", data ?? null, token);

  try {
    const res = await fetch(api + "/users/profile", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (e) {
    console.log(e);
  }
};

const updateProfile = async (data: FormData, token: string) => {
  const config = requestConfig("PUT", data, token, true);

  try {
    const res = await fetch(api + "/users/", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (e) {
    console.log(e);
  }
};

const userService = {
  profile,
  updateProfile,
};

export default userService;
