const joi = require("joi");

const billingAddressSchema = joi.object({
    address: joi.string().required(),
    city: joi.string().required()
})

function billingAddressValidation(req, res, next) {
    const { error } = billingAddressSchema.validate(req.body);
    if(error) {
        return res.json(error)
    }
    next()
}

module.exports = billingAddressValidation;