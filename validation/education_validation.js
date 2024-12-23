const joi = require("joi");

const educationSchema = joi.object({
    degree_title: joi.string().required(),
    institution_name: joi.string().required(),
    start_date: joi.date().required(),
    end_date: joi.date().required(),
    freelancer_id: joi.string()
})

function educationValidation(req, res, next) {
    const { error } = educationSchema.validate(req.body);
    if(error) {
        return res.json(error)
    }
    next()
}

module.exports = educationValidation;