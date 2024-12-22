const Joi = require("joi");

const min_age = 18;

// Schema for registration (bio data)
const freelancerRegistrationSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    date_of_birth: Joi.date().less("now").required()
        .custom((value, helper) => {
            const age = new Date().getFullYear() - new Date(value).getFullYear();
            if (age < min_age) {
                return helper.message(`You must be at least ${min_age} years old.`);
            }
            return value;
        })
        .messages({
            'date.base': 'Date of birth must be a valid date.',
            'date.less': 'Date of birth must be in the past.',
        }),
    mobile_no: Joi.string().pattern(/^9[678]\d{8}$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

function freelancerRegistrationValidation(req, res, next) {
    // Validate the registration bio data only
    const { error } = freelancerRegistrationSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({
            error: error.details.map(detail => ({
                message: detail.message,
                path: detail.path,
            }))
        });
    }
    next();
}

module.exports = {freelancerRegistrationValidation};
