const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    service_name: {
        type: "String",
        required: true,
        unique: true
    }
});

//pre-save middleware to normalize service_name
//.pre("save", ...) - specifically runs before a document is saved to the database
serviceSchema.pre("save", function (next) {
    this.service_name = this.service_name.toLowerCase().trim();
    next();
});

const Service = mongoose.model("service", serviceSchema);

module.exports = Service;