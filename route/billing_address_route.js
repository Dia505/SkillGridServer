const express = require("express")
const router = express.Router();
const {findAll, save, findById, deleteById, update} = require("../controller/billing_address_controller");
const billingAddressValidation = require("../validation/billing_address_validation");
const {authenticateToken} = require("../security/auth");

router.get("/",authenticateToken, findAll);
router.post("/", billingAddressValidation, save);
router.get("/:id",authenticateToken, findById);
router.delete("/:id", deleteById);
router.put("/:id", update)

module.exports = router;