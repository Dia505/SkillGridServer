const joi = require("joi");

const paymentSchema = joi.object({
    amount: joi.number(),
    payment_method: joi.string().required(),
    payment_status: joi.boolean(),
    payment_timestamp: joi.date(),
    appointment_id: joi.string(),
    billing_address_id: joi.string(),
})

function paymentValidation(req, res, next) {
    const { error } = paymentSchema.validate(req.body);
    if(error) {
        return res.json(error)
    }
    next()
}

module.exports = paymentValidation;