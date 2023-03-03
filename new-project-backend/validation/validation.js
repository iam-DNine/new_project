const Joi = require('joi');

const registerValidation = function(data) {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().min(6).required(),
        passwork: Joi.string().min(6).required(),

    });
    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;