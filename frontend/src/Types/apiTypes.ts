export type methodType = "POST" | "GET" | "PUT" | "DELETE";

export type RegisterUserType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginUserType = {
  email: string;
  password: string;
};
