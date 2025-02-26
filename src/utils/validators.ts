import Joi, { ObjectSchema } from 'joi';
import createError from 'http-errors';
import { Request, Response, NextFunction } from 'express';
import { ALLOWED_CATEGORIES } from '../constants/menu';

// schema
export const menuItemSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().max(500).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string()
    .valid(...ALLOWED_CATEGORIES)
    .required(),
});

export const updateMenuItemSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  description: Joi.string().max(500),
  price: Joi.number().min(0),
}).min(1);

export const orderSchema = Joi.object({
  tableId: Joi.number().required(),
  items: Joi.array()
    .items(
      Joi.object({
        menuItem: Joi.object().required(),
        quantity: Joi.number().min(1).default(1),
      }),
    )
    .min(1)
    .required(),
});

// function validator
export const validateData =
  <T>(schema: ObjectSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });

    if (error) {
      return next(createError(400, error.details.map((detail) => detail.message).join(', ')));
    }

    req.body = value;
    next();
  };
