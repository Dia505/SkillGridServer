const joi = require("joi");

const reviewSchema = joi.object({
    rating: joi.number().required(),
    review: joi.string().required(),
    review_date:joi.string(),
    client_id:joi.string(),
    freelancer_id:joi.string()
})

function reviewValidation(req, res, next) {
    const { error } = reviewSchema.validate(req.body);
    if(error) {
        return res.json(error)
    }
    next()
}

module.exports = reviewValidation;