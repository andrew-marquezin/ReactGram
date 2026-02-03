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

export type UserType = {
  _id: string;
  name: string;
  email: string;
  bio?: string;
  profileImage?: File;
  password?: string;
  createdAt: string;
  updatedAt: string;
};
