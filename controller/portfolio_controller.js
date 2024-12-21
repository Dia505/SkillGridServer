const Portfolio = require("../model/Portfolio")

const findAll = async (req,res) => {
    try {
        const portfolio = await Portfolio.find().populate("freelancer_service_id")
        res.status(200).json(portfolio);
    }
    catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const {caption, freelancer_service_id} = req.body
        const portfolio = new Portfolio({
            caption,
            freelancer_service_id,
            file_path: req.file.originalname
        });
        await portfolio.save();
        res.status(201).json(portfolio)
    }
    catch (e) {
        res.json(e)
    }
}

const findById = async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id);
        res.status(200).json(portfolio);
    }
    catch (e) {
        res.json(e)
    }
}

const findByFreelancerServiceId = async (req, res) => {
    try {
        const {freelancer_service_id} = req.params;
        const portfolio = await Portfolio.find({freelancer_service_id}).populate("freelancer_service_id");
        res.status(200).json(portfolio);
    }
    catch (e) {
        res.json(e)
    }
}

const deleteById = async (req, res) => {
    try {
        const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
        res.status(200).json("Data deleted");
    }
    catch (e) {
        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json(portfolio);
    }
    catch (e) {
        res.json(e)
    }
}



module.exports = {
    findAll,
    save,
    findById,
    findByFreelancerServiceId,
    deleteById,
    update
}