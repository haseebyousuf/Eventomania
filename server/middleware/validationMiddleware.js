import { body } from "express-validator";

export const convenorValidationRules = [
  body("name")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Name is required")
    .escape(),

  body("password")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[0-9]/)
    .withMessage("Password requires a number")
    .matches(/[a-z]/)
    .withMessage("Password requires a lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password requires an uppercase letter")
    .matches(/[^\w]/)
    .withMessage("Password requires a symbol")
    .escape(),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("mobile")
    .trim()
    .isString()
    .matches(/^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/)
    .withMessage("Invalid phone number")
    .escape(),
];

export const committeeValidationRules = [
  body("name")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Name is required")
    .escape(),

  body("description")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Description is required")
    .escape(),
];

export const memberValidationRules = [
  body("memberName")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Name is required")
    .escape(),

  body("memberPassword")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[0-9]/)
    .withMessage("Password requires a number")
    .matches(/[a-z]/)
    .withMessage("Password requires a lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password requires an uppercase letter")
    .matches(/[^\w]/)
    .withMessage("Password requires a symbol")
    .escape(),

  body("memberEmail")
    .trim()
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail(),

  body("mobile")
    .trim()
    .isString()
    .matches(/^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/)
    .withMessage("Invalid phone number")
    .notEmpty()
    .withMessage("Mobile is required")
    .escape(),
];

export const changePasswordValidationRules = [
  body("currentPassword")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Current Password is required")
    .escape(),

  body("newPassword")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("New Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[0-9]/)
    .withMessage("Password requires a number")
    .matches(/[a-z]/)
    .withMessage("Password requires a lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password requires an uppercase letter")
    .matches(/[^\w]/)
    .withMessage("Password requires a symbol")
    .custom((value, { req }) => {
      if (value === req.body.currentPassword) {
        throw new Error("Old Password and New Password Cannot Be the Same");
      }
      return true;
    })
    .escape(),

  body("cNewPassword")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Confirm Password is required")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Passwords do not match");
      }
      return true;
    })
    .escape(),
];

export const eventValidationRules = [
  body("name")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Name is required")
    .escape(),

  body("startDate")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Start Date is required")
    .toDate(),

  body("endDate")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("End Date and Time is required")
    .toDate(),

  body("venue")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Venue is required")
    .escape(),

  body("description")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Description is required")
    .escape(),
];

export const studentValidationRules = [
  body("name")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Name is required")
    .escape(),

  body("regNo")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Registration Number is required")
    .escape(),

  body("mobileNo")
    .trim()
    .isString()
    .matches(/^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/)
    .withMessage("That doesn't look like a valid phone number")
    .notEmpty()
    .withMessage("Mobile is required")
    .escape(),

  body("email")
    .trim()
    .isEmail()
    .withMessage("That doesn't look like an email")
    .notEmpty()
    .withMessage("Email is required")
    .normalizeEmail(),
];

export const facultyValidationRules = [
  body("name")
    .trim()
    .isString()
    .notEmpty()
    .withMessage("Name is required")
    .escape(),

  body("mobileNo")
    .trim()
    .isString()
    .matches(/^(\+91[-\s]?)?[0]?(91)?[6789]\d{9}$/)
    .withMessage("That doesn't look like a valid phone number")
    .notEmpty()
    .withMessage("Mobile is required")
    .escape(),

  body("email")
    .trim()
    .isEmail()
    .withMessage("That doesn't look like an email")
    .notEmpty()
    .withMessage("Email is required")
    .normalizeEmail(),
];

// We use .trim() to remove leading and trailing whitespace from user inputs.
// We use .escape() to sanitize the input and prevent potential XSS attacks.
// For the email field, we use .normalizeEmail() to sanitize and normalize the email address.
