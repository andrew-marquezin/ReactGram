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
};

export type PhotoType = {
  _id: string;
  title: string;
  image: string;
  comments: CommentType[];
  likes: string[];
};

export type CommentType = {
  _id: string;
  userId: string;
  userName: string;
  text: string;
};
