const express = require("express")
const router = express.Router();
const {findAll, save, findById, deleteById, update} = require("../controller/billing_address_controller");
const billingAddressValidation = require("../validation/billing_address_validation");
const {authenticateToken} = require("../security/auth");
const {authorizeRole} = require("../security/auth");

router.get("/", authenticateToken, authorizeRole("admin"), findAll);
router.post("/", billingAddressValidation, authenticateToken, authorizeRole("client"), save);
router.get("/:id",authenticateToken, authorizeRole("admin", "client"), findById);
router.delete("/:id", authenticateToken, authorizeRole("client"), deleteById);
router.put("/:id", authenticateToken, authorizeRole("client"), update)

module.exports = router;