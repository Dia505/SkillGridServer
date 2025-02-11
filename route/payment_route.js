const express = require("express")
const router = express.Router();
const {findAll, save, findById, findByAppointmentId, findByFreelancerId, deleteById, update} = require("../controller/payment_controller");
const paymentValidation = require("../validation/payment_validation");
const {authenticateToken} = require("../security/auth");
const {authorizeRole} = require("../security/auth");

router.get("/", authenticateToken, authorizeRole("admin"), findAll);
router.post("/", paymentValidation, save);
router.get("/:id", authenticateToken, authorizeRole("admin"), findById);
router.get("/appointment/:appointment_id", authenticateToken, authorizeRole("admin","client","freelancer"), findByAppointmentId);
router.get("/freelancer/:freelancer_id", authenticateToken, authorizeRole("freelancer"), findByFreelancerId);
router.delete("/:id", authenticateToken, authorizeRole("client","freelancer"), deleteById);
router.put("/:id", authenticateToken, authorizeRole("client","freelancer"), update);

module.exports = router;