const Freelancer_Service = require("../model/Freelancer_Service");
const Portfolio = require("../model/Portfolio")

const findAll = async (req, res) => {
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
        const { freelancer_service_id } = req.body;
        // Map to get file names from the uploaded files
        const filePaths = req.files.map(file => file.originalname);

        const portfolio = new Portfolio({
            freelancer_service_id,
            file_path: filePaths,  // Save array of file paths
        });

        await portfolio.save();
        res.status(201).json(portfolio);
    } catch (e) {
        res.json(e);
    }
};


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
        const { freelancer_service_id } = req.params;
        const portfolio = await Portfolio.find({ freelancer_service_id })
            .populate({
                path: "freelancer_service_id",
                populate: [
                    { path: "freelancer_id" },
                    { path: "service_id" }
                ]
            });

        const BASE_URL = "http://localhost:3000";

        // Format file_path to full URL
        const portfolioImages = portfolio.map(item => {
            return {
                _id: item._id,
                freelancer_service_id: item.freelancer_service_id,
                file_path: item.file_path.map(file => `${BASE_URL}/service_portfolio_images/${file}`),
                upload_date: item.upload_date,
            };
        });

        res.status(200).json(portfolioImages); // Send the response with full URLs for file_path
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}

const findByFreelancerId = async (req, res) => {
    try {
        // Step 1: Find freelancer_service(s) for the given freelancerId
        const freelancerService = await Freelancer_Service.find({ "freelancer_id": req.params.freelancer_id });

        if (!freelancerService || freelancerService.length === 0) {
            return res.status(404).json({ message: 'Freelancer service not found' });
        }

        // Step 2: Find portfolio associated with the freelancer_service_ids
        const portfolio = await Portfolio.find({
            freelancer_service_id: { $in: freelancerService.map(service => service._id) }
        }).populate('freelancer_service_id');

        const BASE_URL = "http://localhost:3000";

        // Format file_path to full URL
        const portfolioImages = portfolio.map(item => {
            return {
                _id: item._id,
                freelancer_service_id: item.freelancer_service_id._id,
                file_path: item.file_path.map(file => `${BASE_URL}/service_portfolio_images/${file}`),
                upload_date: item.upload_date,
            };
        });

        res.status(200).json(portfolioImages); // Send the response with full URLs for file_path
    } catch (error) {
        console.error("Error retrieving portfolio:", error);
        res.status(500).json({ message: 'Server error, unable to retrieve portfolio' });
    }
};


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
    findByFreelancerId,
    deleteById,
    update
}