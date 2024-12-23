const joi = require("joi");

//Since file_path is being handled by multer, it won’t be in req.body. 
    //Instead, it will be in req.file (for single file upload) or req.files (for multiple file uploads).
const portfolioSchema = joi.object({
    upload_date: joi.date(),
    caption: joi.string(),
    freelancer_service_id: joi.string()
})

function portfolioValidation(req, res, next) {
    const { error } = portfolioSchema.validate(req.body);
    if(error) {
        return res.json(error)
    }
    next()
}

module.exports = portfolioValidation;