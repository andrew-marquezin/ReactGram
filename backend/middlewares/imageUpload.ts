import multer from "multer";
import path from "path";

const imageStorage = multer.diskStorage({
  destination(req, _, callback) {
    let folder = "";

    if (req.baseUrl.includes("users")) {
      folder = "users";
    } else if (req.baseUrl.includes("photos")) {
      folder = "photos";
    }

    callback(null, `uploads/${folder}`);
  },
  filename(_, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(_, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error("Only image files are allowed!"));
    }
    callback(null, true);
  },
});

export { imageUpload };
