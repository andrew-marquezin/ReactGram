import { api, requestConfig } from "../utils/config";

const publishPhoto = async (data: FormData, token: string) => {
  const config = requestConfig("POST", data, token, true);

  try {
    const res = await fetch(api + "/photos", config)
      .then((res) => res.json())
      .catch((err) => err.json());

    return res;
  } catch (e) {
    console.log(e);
  }
};

const getUserPhotos = async (id: string, token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/photos/user/" + id, config)
      .then((res) => res.json())
      .catch((err) => err.json());
    return res;
  } catch (e) {
    console.log(e);
  }
};

const deletePhoto = async (id: string, token: string) => {
  const config = requestConfig("DELETE", null, token);

  try {
    const res = await fetch(api + "/photos/" + id, config)
      .then((res) => res.json())
      .catch((err) => err.json());
    return res;
  } catch (e) {
    console.log(e);
  }
};

const updatePhoto = async (
  data: { title: string },
  id: string,
  token: string,
) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + "/photos/" + id, config)
      .then((res) => res.json())
      .catch((err) => err.json());
    return res;
  } catch (e) {
    console.log(e);
  }
};

const getPhoto = async (id: string, token: string) => {
  const config = requestConfig("GET", null, token);

  try {
    const res = await fetch(api + "/photos/" + id, config)
      .then((res) => res.json())
      .catch((err) => err.json());
    return res;
  } catch (e) {
    console.log(e);
  }
};

const like = async (id: string, token: string) => {
  const config = requestConfig("PUT", null, token);

  try {
    const res = await fetch(api + "/photos/like/" + id, config)
      .then((res) => res.json())
      .catch((err) => err.json());
    return res;
  } catch (e) {
    console.log(e);
  }
};

const comment = async (
  data: { comment: string },
  id: string,
  token: string,
) => {
  const config = requestConfig("PUT", data, token);

  try {
    console.log("service: ", data, id);
    const res = await fetch(api + "/photos/comment/" + id, config)
      .then((res) => res.json())
      .catch((err) => err.json());
    return res;
  } catch (e) {
    console.log(e);
  }
};

const photoService = {
  publishPhoto,
  getUserPhotos,
  deletePhoto,
  updatePhoto,
  getPhoto,
  like,
  comment,
};

export default photoService;
