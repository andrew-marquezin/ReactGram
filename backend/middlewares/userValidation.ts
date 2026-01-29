import { body } from "express-validator";

const createUserValidation = () => {
  return [
    body("name")
      .not()
      .isEmpty()
      .withMessage("Nome é obrigatório")
      .isLength({ min: 3 })
      .withMessage("Nome deve ter pelo menos 3 caracteres"),
    body("email")
      .not()
      .isEmpty()
      .withMessage("Email é obrigatório")
      .isEmail()
      .withMessage("Endereço de email inválido"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Senha é obrigatória")
      .isLength({ min: 6 })
      .withMessage("Senha deve ter pelo menos 6 caracteres"),
    body("confirmPassword")
      .not()
      .isEmpty()
      .withMessage("Confirme a senha é obrigatório")
      .custom((value, { req }) => value === req.body.password)
      .withMessage("As senhas não coincidem"),
  ];
};

const loginValidation = () => [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email é obrigatório")
    .isEmail()
    .withMessage("Endereço de email inválido"),
  body("password").not().isEmpty().withMessage("Senha é obrigatória"),
];

const userUpdateValidation = () => [
  body("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Nome deve ter pelo menos 3 caracteres"),
  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Senha deve ter pelo menos 6 caracteres"),
];

export { createUserValidation, loginValidation, userUpdateValidation };
