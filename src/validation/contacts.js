import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  contactType: Joi.string().valid('work', 'home', 'personal').default('personal'),
  isFavourite: Joi.boolean()
});


export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().pattern(/^[0-9+]{6,16}$/),
  contactType: Joi.string().valid('work', 'home', 'personal'),
}).min(1);
