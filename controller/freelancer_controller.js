const Freelancer = require("../model/Freelancer")
const Client = require("../model/Client");

const findAll = async (req,res) => {
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
        const {first_name, last_name, date_of_birth, mobile_no, email, password, address, city, bio, job_category, profession, skills, years_of_experience, available} = req.body
        const profilePicture = req.files?.profile_picture?.[0]?.filename || "default_profile.png";
        const backgroundPicture = req.files?.background_picture?.[0]?.filename || "default_bg_img.jpg";

        const freelancer = new Freelancer({
            first_name,
            last_name,
            date_of_birth,
            mobile_no,
            email,
            password,
            address,
            city,
            bio,
            job_category,
            profession,
            skills,
            years_of_experience,
            available,
            profile_picture: profilePicture,
            background_picture: backgroundPicture,
        });
        await freelancer.save();
        res.status(201).json(freelancer)
    }
    catch (e) {
        res.json(e)
    }
}

const findById = async (req, res) => {
    try {
        const freelancer = await Freelancer.findById(req.params.id);
        res.status(200).json(freelancer);
    }
    catch (e) {
        res.json(e)
    }
}

const deleteById = async (req, res) => {
    try {
        const freelancer = await Freelancer.findByIdAndDelete(req.params.id);
        res.status(200).json("Data deleted");
    }
    catch (e) {
        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const freelancer = await Freelancer.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json(freelancer);
    }
    catch (e) {
        res.json(e)
    }
}

module.exports = {
    findAll,
    save,
    findById,
    deleteById,
    update
}