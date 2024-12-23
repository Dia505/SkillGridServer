const joi = require("joi");

const freelancerServiceSchema = joi.object({
    hourly_rate: joi.number().required(),
    description: joi.string(),
    service_id: joi.string(),
    freelancer_id: joi.string()
})

function freelancerServiceValidation(req, res, next) {
    const { error } = freelancerServiceSchema.validate(req.body);
    if(error) {
        return res.json(error)
    }
    next()
}

module.exports = freelancerServiceValidation;