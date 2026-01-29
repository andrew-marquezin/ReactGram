import { UserController } from "../controllers/UserController";
import { Router } from "express";
import { validate } from "../middlewares/handleValidation";
import {
  createUserValidation,
  loginValidation,
  userUpdateValidation,
} from "../middlewares/userValidation";
import { authGuard } from "../middlewares/authGuard";
import { imageUpload } from "../middlewares/imageUpload";

const userRouter = Router();
const userController = new UserController();

userRouter.put(
  "/",
  authGuard,
  userUpdateValidation(),
  validate,
  imageUpload.single("profileImage"),
  userController.update,
);

userRouter.get("/:id", userController.getUserById);

userRouter.get("/profile", authGuard, userController.getCurrentUser);

userRouter.post(
  "/register",
  createUserValidation(),
  validate,
  userController.register,
);

userRouter.post("/login", loginValidation(), validate, userController.login);

export default userRouter;
