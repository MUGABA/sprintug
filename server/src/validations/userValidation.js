import Joi from "joi";

const validateUser = (userData) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .required()
      .messages({ "string.empty": "Full name is required" }),
    email: Joi.string()
      .required()
      .email()
      .messages({ "string.empty": "Email must valid and is required" }),
    password: Joi.string()
      .min(6)
      .required()
      .messages({ "string.empty": "Password is required" }),
  });
  return schema.validate(userData);
};

export const validateUserLogin = (userData) => {
  const schema = Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .messages({ "string.empty": "Email must valid and is required" }),
    password: Joi.string()
      .required()
      .messages({ "string.empty": "Password is required" }),
  });
  return schema.validate(userData);
};
export default validateUser;
