import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name must be at most 20 characters',
    'any.required': 'Name is required'
  }),
  phoneNumber: Joi.string().pattern(/^[0-9+]{6,16}$/).required().messages({
    'string.pattern.base': 'Phone number must be between 6 and 16 digits',
    'string.empty': 'Phone number cannot be empty',
    'any.required': 'Phone number is required'
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').required().messages({
    'any.only': 'Invalid contact type',
    'string.empty': 'Contact type cannot be empty',
    'any.required': 'Contact type is required'
  })
});


export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name must be at most 20 characters'
  }),
  phoneNumber: Joi.string().pattern(/^[0-9+]{6,16}$/).messages({
    'string.pattern.base': 'Phone number must be between 6 and 16 digits',
    'string.empty': 'Phone number cannot be empty'
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': 'Invalid contact type',
    'string.empty': 'Contact type cannot be empty'
  })
}).min(1);
