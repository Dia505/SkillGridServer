const joi = require("joi");

const projectDurationSchema = joi.object({
    value: joi.number().min(1).required(),
    unit: joi.string().valid("hour", "day", "week", "month", "year").required()
});

const appointmentSchema = joi.object({
    appointment_purpose: joi.string().required(),
    appointment_date: joi.date().required(),
    project_duration: projectDurationSchema.required(),
    appointment_time: joi.string(),
    status: joi.boolean(),
    freelancer_service_id: joi.string(),
    client_id: joi.string()
})

function appointmentValidation(req, res, next) {
    const { error } = appointmentSchema.validate(req.body);
    if(error) {
        return res.json(error)
    }
    next()
}

module.exports = appointmentValidation;