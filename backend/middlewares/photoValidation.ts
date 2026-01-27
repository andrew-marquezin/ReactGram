import { body } from "express-validator";

const photoInsertValidation = () => [
  body("title")
    .not()
    .equals("undefined")
    .withMessage("Title is required")
    .not()
    .isEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),
  body("image").custom((value, { req }) => {
    if (!req.file) {
      throw new Error("Image is required");
    }
    return true;
  }),
];

const photoUpdateValidation = () => [
  body("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),
];

const commentValidation = () => [
  body("comment").not().isEmpty().withMessage("Comment cannot be empty"),
];

export { photoInsertValidation, photoUpdateValidation, commentValidation };
