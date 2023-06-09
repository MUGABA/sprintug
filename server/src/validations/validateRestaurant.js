import Joi from "joi";

const validateRestaurant = (userData) => {
  const schema = Joi.object().keys({
    name: Joi.string()
      .required()
      .messages({ "string.empty": "Name is required" }),
    location: Joi.string()
      .required()
      .messages({ "string.empty": "Location is required" }),
    cuisineType: Joi.string()
      .required()
      .messages({ "string.empty": "Cuisine Type is required" }),
  });
  return schema.validate(userData);
};

export default validateRestaurant;
