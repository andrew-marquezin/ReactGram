import type { methodType } from "../Types/apiTypes";

export const api = "http://localhost:5000/api";
export const upload = "http://localhost:5000/uploads/";

export const requestConfig = (
  method: methodType,
  data?: any,
  token?: string,
  image?: string,
) => {
  let config: RequestInit;

  if (image) {
    config = {
      method,
      body: data,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };
  } else if (method === "DELETE" || data === null) {
    config = {
      method,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };
  } else {
    config = {
      method,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };
  }

  return config;
};
