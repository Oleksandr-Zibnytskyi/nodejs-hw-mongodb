import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().integer().min(6).max(16).required(),
  contactType: Joi.string().valid('work', 'home', 'personal').required(),
  isFavourite: Joi.boolean(),
});


export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required().messages(),
    email: Joi.string().email().required(),
    phoneNumber: Joi.string().integer().min(6).max(16).required(),
    contactType: Joi.string().valid('work', 'home', 'personal').required(),
    isFavourite: Joi.boolean(),
  });
