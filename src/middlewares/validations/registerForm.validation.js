const { body } = require("express-validator");


const validationUsername = () =>
  body("username").notEmpty().isLength({
    min: 8,
    max: 16,
  });
const validationPassword = () => body("password").notEmpty().isLength({ min: 8 });
const validationEmail = () => body("email").notEmpty().isEmail();
const validationFirstName = () => body("firstName").notEmpty();
const validationLastName = () => body("lastName").notEmpty();

module.exports = {
  validationUsername,
  validationPassword,
  validationEmail,
  validationFirstName,
  validationLastName,
};
