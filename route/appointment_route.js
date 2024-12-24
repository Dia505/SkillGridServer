const express = require("express")
const router = express.Router();
const {findAll, save, findById, findByFreelancerServiceId, findByClientId, deleteById, update} = require("../controller/appointment_controller");
const appointmentValidation = require("../validation/appointment_validation");
const {authenticateToken} = require("../security/auth");

router.get("/", authenticateToken, findAll);
router.post("/", appointmentValidation, save);
router.get("/:id", authenticateToken, findById);
router.get("/freelancer-service/:freelancer_service_id", findByFreelancerServiceId);
router.get("/client/:client_id", findByClientId);
router.delete("/:id", deleteById);
router.put("/:id", update);

module.exports = router;