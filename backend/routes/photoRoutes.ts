import { Router } from "express";
import { PhotoController } from "../controllers/PhotoController";
import { authGuard } from "../middlewares/authGuard";
import { imageUpload } from "../middlewares/imageUpload";
import {
  commentValidation,
  photoInsertValidation,
  photoUpdateValidation,
} from "../middlewares/photoValidation";
import { validate } from "../middlewares/handleValidation";

const photoRouter = Router();
const photoController = new PhotoController();

photoRouter.get("/", authGuard, photoController.getAllPhotos);

photoRouter.post(
  "/",
  authGuard,
  imageUpload.single("image"),
  photoInsertValidation(),
  validate,
  photoController.insertPhoto,
);

photoRouter.get("/:id", authGuard, photoController.getPhotoById);

photoRouter.put(
  "/:id",
  authGuard,
  photoUpdateValidation(),
  validate,
  photoController.updatePhoto,
);

photoRouter.put("/like/:id", authGuard, photoController.likePhoto);

photoRouter.put(
  "/comment/:id",
  authGuard,
  commentValidation(),
  validate,
  photoController.commentPhoto,
);

photoRouter.get("/user/:id", authGuard, photoController.getUserPhotos);

photoRouter.delete("/:id", authGuard, photoController.deletePhoto);

export default photoRouter;
