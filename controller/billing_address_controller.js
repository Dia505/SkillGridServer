const BillingAddress = require("../model/Billing_Address");

const findAll = async (req,res) => {
    try {
        const billingAddress = await BillingAddress.find();
        res.status(200).json(billingAddress);
    }
    catch (e) {
        res.json(e)
    }
}

const save = async (req, res) => {
    try {
        const billingAddress = new BillingAddress(req.body);
        await billingAddress.save();
        res.status(201).json(billingAddress)
    }
    catch (e) {
        res.json(e)
    }
}

const findById = async (req, res) => {
    try {
        const billingAddress = await BillingAddress.findById(req.params.id);
        res.status(200).json(billingAddress);
    }
    catch (e) {
        res.json(e)
    }
}

const deleteById = async (req, res) => {
    try {
        const billingAddress = await BillingAddress.findByIdAndDelete(req.params.id);
        res.status(200).json("Data deleted");
    }
    catch (e) {
        res.json(e)
    }
}

const update = async (req, res) => {
    try {
        const billingAddress = await BillingAddress.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json(billingAddress);
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
    update,
}