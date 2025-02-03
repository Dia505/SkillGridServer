const joi = require("joi");

const employmentSchema = joi.object({
    company_name: joi.string().required(),
    job_title: joi.string().required(),
    start_date: joi.date().required(),
    end_date: joi.date(),
    description: joi.string(),
    freelancer_id: joi.string()
})

function employmentValidation(req, res, next) {
    const { error } = employmentSchema.validate(req.body);
    if(error) {
        return res.json(error)
    }
    next()
}

module.exports = employmentValidation;