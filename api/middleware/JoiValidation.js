'use strict';

const Joi = require('joi');

module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if(result.error) {
                return res.status(400).json(result.error);
            }

            if( !req.value ) { req.value = {}; }
            req.value['body'] = result.value;
            next();
        }
    },

    schemas: {
        signupSchema: Joi.object().keys({
            email:     Joi.string().email().required(),
            password:  Joi.string().length(8).required(),
            firstname: Joi.string().min(3).required(),
            lastname:  Joi.string().min(3).required(),
            username:  Joi.string().min(3).required()
        }),
        loginSchema: Joi.object().keys({
            email:     Joi.string().required().email({ minDomainAtoms: 2 }),
            password:  Joi.string().length(8).required(),
        }),
        categorySchema: Joi.object().keys({
            category:    Joi.string().required(),
            category_id: Joi.number().required()
        }),
        productSchema: Joi.object().keys({
            title:       Joi.string().required(), 
            series:      Joi.string(),
            book:        Joi.number(),
            author:      Joi.string().required(),
            description: Joi.string().required(),
            price:       Joi.number().required(),
            imagePath:   Joi.string().required() 
        })

        productUpdateSchema: Joi.object().keys({
            title:       Joi.string(), 
            series:      Joi.string(),
            book:        Joi.number(),
            author:      Joi.string(),
            description: Joi.string(),
            price:       Joi.number(),
            imagePath:   Joi.string() 
        })
    }
}