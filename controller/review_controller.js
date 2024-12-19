const Review = require("../model/Review")

const findAll = async (req,res) => {
    try {
        const review = await Review.find().populate(["client_id", "freelancer_id"]);
        res.status(200).json(review);
    }
    catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();
        res.status(201).json(review)
    }
    catch (e) {
        res.json(e)
    }
}

const findById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        res.status(200).json(review);
    }
    catch (e) {
        res.json(e)
    }
}

const findByClientId = async (req, res) => {
    try {
        const {client_id} = req.params;
        const review = await Review.find({client_id}).populate("client_id");
        res.status(200).json(review);
    }
    catch (e) {
        res.json(e)
    }
}

const findByFreelancerId = async (req, res) => {
    try {
        const {freelancer_id} = req.params;
        const review = await Review.find({freelancer_id}).populate("freelancer_id");
        res.status(200).json(review);
    }
    catch (e) {
        res.json(e)
    }
}

const deleteById = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        res.status(200).json("Data deleted");
    }
    catch (e) {
        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json(review);
    }
    catch (e) {
        res.json(e)
    }
}

module.exports = {
    findAll,
    save,
    findById,
    findByClientId,
    findByFreelancerId,
    deleteById,
    update,
}