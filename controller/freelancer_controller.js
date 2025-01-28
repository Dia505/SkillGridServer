const Freelancer = require("../model/Freelancer");
const bcrypt = require("bcryptjs");
const Role = require("../model/Role");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "ead678ab98e529472a8ba3bb8940653229510e01a9078ef9b15320d385f9df02";
const BASE_URL = "http://localhost:3000";

const findAll = async (req, res) => {
    try {
        const freelancer = await Freelancer.find();
        res.status(200).json(freelancer);
    }
    catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const { first_name, last_name, date_of_birth, mobile_no, email, password, address, city, bio, job_category, profession, skills, years_of_experience, available } = req.body
        const hashedPassword = await bcrypt.hash(password, 10);

        const profilePicture = req.files?.profile_picture?.[0]?.filename || "default_profile_img.png";
        const backgroundPicture = req.files?.background_picture?.[0]?.filename || "default_bg_img.jpg";

        const freelancer = new Freelancer({
            first_name,
            last_name,
            date_of_birth,
            mobile_no,
            email,
            password: hashedPassword,
            address,
            city,
            bio,
            job_category,
            profession,
            skills,
            years_of_experience,
            available,
            profile_picture: profilePicture,
            background_picture: backgroundPicture
        });
        await freelancer.save();

        const token = jwt.sign(
            { role: freelancer.role, userId: freelancer._id },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        console.log(token); // Log token for debugging

        res.status(201).json({
            message: "Freelancer created successfully",
            freelancer,
            token,
        });
    } catch (e) {
        console.error(e); // Log error for debugging
        res.status(500).json({ message: "Internal Server Error", error: e.message });
    }
}

const findById = async (req, res) => {
    try {
        const freelancer = await Freelancer.findById(req.params.id);
        if (!freelancer) {
            return res.status(404).json({ message: "Freelancer not found" });
        }

        // Ensure profile_picture contains a full URL
        const profilePicture = freelancer.profile_picture
            ? `${BASE_URL}/freelancer_images/${freelancer.profile_picture}`
            : `${BASE_URL}/freelancer_images/default_profile_img.png`; // Fallback to default image

        res.status(200).json({ ...freelancer._doc, profile_picture: profilePicture });
    }
    catch (e) {
        res.json(e)
    }
}

const searchFreelancers = async (req, res) => {
    try {
        const searchQuery = req.params.searchQuery.trim();

        // MongoDB regex search (case-insensitive)
        const freelancers = await Freelancer.find({
            $or: [
                { first_name: { $regex: new RegExp(searchQuery, "i") } },  // Match first name
                { last_name: { $regex: new RegExp(searchQuery, "i") } },   // Match last name
                { profession: { $regex: new RegExp(searchQuery, "i") } },  // Match profession
                { job_category: { $regex: new RegExp(searchQuery, "i") } }, // Match job category
                {
                    $expr: {  // Combine first_name + last_name for full name search
                        $regexMatch: {
                            input: { $concat: ["$first_name", " ", "$last_name"] },
                            regex: new RegExp(searchQuery, "i")
                        }
                    }
                }
            ]
        });

        if (freelancers.length === 0) {
            return res.status(404).json({ message: "No freelancers found" });
        }

        res.status(200).json(freelancers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteById = async (req, res) => {
    try {
        const freelancer = await Freelancer.findByIdAndDelete(req.params.id);
        res.status(200).json("Data deleted");
    }
    catch (e) {
        res.json(e)
    }
};

const update = async (req, res) => {
    try {
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            req.body.password = hashedPassword;
        }
        const freelancer = await Freelancer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json(freelancer);
    }
    catch (e) {
        res.json(e)
    }
};

const updateProfilePicture = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const freelancer = await Freelancer.findByIdAndUpdate(
        req.params.id,
        { profile_picture: req.file.filename },
        { new: true }
    );

    if (!freelancer) {
        return res.status(404).json({ message: "Freelancer not found" });
    }

    res.status(200).json(freelancer);
};

const updateBgPicture = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const freelancer = await Freelancer.findByIdAndUpdate(
        req.params.id,
        { background_picture: req.file.filename },
        { new: true }
    );

    if (!freelancer) {
        return res.status(404).json({ message: "Freelancer not found" });
    }

    res.status(200).json(freelancer);
};


module.exports = {
    findAll,
    save,
    findById,
    searchFreelancers,
    deleteById,
    update,
    updateProfilePicture,
    updateBgPicture
}