const joi = require("joi");

const clientSchema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),    
    mobile_no: joi.string().pattern(/^9[678]\d{8}$/).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    city: joi.string().required(),
})

function clientValidation(req, res, next) {
    const {first_name, last_name, mobile_no, email, password, city} = req.body;
    const {error} = clientSchema.validate({first_name, last_name, mobile_no, email, password, city})
    
    if(error) {
        return res.json(error)
    }
    next()
}

module.exports = clientValidation;