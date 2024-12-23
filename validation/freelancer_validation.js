const joi = require("joi");

const min_age = 18;

// Schema for registration (bio data)
const freelancerRegistrationSchema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    date_of_birth: joi.date().less("now").required()
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
    mobile_no: joi.string().pattern(/^9[678]\d{8}$/).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    address: joi.string().required(),
    city: joi.string().required()
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
