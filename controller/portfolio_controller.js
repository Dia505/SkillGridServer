const Portfolio = require("../model/Portfolio")

const findAll = async (req,res) => {
    try {
        const portfolio = await Portfolio.find()
            .populate({
                path: "freelancer_service_id",
                populate: [
                    { path: "freelancer_id" }, // Populates the freelancer details
                    { path: "service_id" }     // Populates the service details
                ]
            });
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
        const portfolio = await Portfolio.findById(req.params.id)
            .populate({
                path: "freelancer_service_id",
                populate: [
                    { path: "freelancer_id" },
                    { path: "service_id" }
                ]
            });
        res.status(200).json(portfolio);
    }
    catch (e) {
        res.json(e)
    }
}

const findByFreelancerServiceId = async (req, res) => {
    try {
        const {freelancer_service_id} = req.params;
        const portfolio = await Portfolio.find({freelancer_service_id})
            .populate({
                path: "freelancer_service_id",
                populate: [
                    { path: "freelancer_id" },
                    { path: "service_id" }
                ]
            });
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
        // Prepare the update data object
        const updatedData = { ...req.body };

        // Check if a new file has been uploaded and update the file_path
        if (req.file) {
            updatedData.file_path = req.file.filename;
        }

        // Update the portfolio with the new data
        const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        // If no portfolio found, return a 404 error
        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }

        // Return the updated portfolio
        res.status(200).json(portfolio);
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

module.exports = {
    findAll,
    save,
    findById,
    findByFreelancerServiceId,
    deleteById,
    update
}