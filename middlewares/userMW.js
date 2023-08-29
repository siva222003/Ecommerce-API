const { body } = require("express-validator");

// Express-validator middleware for user creation route
exports.createUserValidation = () => [
  body("name")
    .trim()
    .isLength({ min: 4, max: 30 })
    .withMessage("Name should have between 4 and 30 characters"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long"),
];

// Express-validator middleware for user login route
exports.loginUserValidation = () => [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8 characters long"),
];

// Express-validator middleware for user profile update route
exports.updateUserValidation = () => [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 4, max: 30 })
    .withMessage("Name should have between 4 and 30 characters"),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address"),
];
