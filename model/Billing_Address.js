const mongoose = require("mongoose");

const billingAddressSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: false
    },
});
const Billing_Address = mongoose.model("billing_address", billingAddressSchema);

module.exports = Billing_Address;
