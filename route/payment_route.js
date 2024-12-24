const express = require("express")
const router = express.Router();
const {findAll, save, findById, findByAppointmentId, deleteById, update} = require("../controller/payment_controller");
const paymentValidation = require("../validation/payment_validation");
const {authenticateToken} = require("../security/auth");

router.get("/", authenticateToken, findAll);
router.post("/", paymentValidation, save);
router.get("/:id", authenticateToken, findById);
router.get("/appointment/:appointment_id", findByAppointmentId);
router.delete("/:id", deleteById);
router.put("/:id", update);

module.exports = router;