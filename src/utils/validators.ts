import Joi, { ObjectSchema } from 'joi';

// schema
export const menuItemSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(500).required(),
    price: Joi.number().min(0).required(),
});

export const orderSchema = Joi.object({
    items: Joi.array().items(
        Joi.object({
            menuItem: Joi.object().required(),
            quantity: Joi.number().min(1).default(1),
        })
    ).min(1).required(),
});

// function validator
export const validateData = <T>(schema: ObjectSchema<T>, data: unknown): T => {
    const { error, value } = schema.validate(data, { abortEarly: false, stripUnknown: true });

    if (error) {
        throw new Error(error.details.map((detail) => detail.message).join(', '));
    }

    return value;
};