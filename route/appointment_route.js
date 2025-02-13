const express = require("express")
const router = express.Router();
const {findAll, save, findById, findByFreelancerServiceId, findByClientId, findByFreelancerId, deleteById, update, acceptAppointment} = require("../controller/appointment_controller");
const appointmentValidation = require("../validation/appointment_validation");
const {authenticateToken} = require("../security/auth");
const {authorizeRole} = require("../security/auth");

router.get("/", authenticateToken, authorizeRole("admin"), findAll);
router.post("/", appointmentValidation, authenticateToken, authorizeRole("client"), save);
router.get("/:id", authenticateToken, authorizeRole("admin"), findById);
router.get("/freelancer-service/:freelancer_service_id", authenticateToken, authorizeRole("admin","freelancer"), findByFreelancerServiceId);
router.get("/client/:client_id", authenticateToken, authorizeRole("admin","client"), findByClientId);
router.get("/freelancer/:freelancer_id", authenticateToken, findByFreelancerId);
router.delete("/:id", authenticateToken, authorizeRole("client"), deleteById);
router.put("/:id", authenticateToken, authorizeRole("client","freelancer"), update);
router.put("/:id", authenticateToken, authorizeRole("freelancer"), acceptAppointment);

module.exports = router;