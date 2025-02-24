const express = require("express")
const router = express.Router();
const { findAll, save, findById, deleteById, update, findByClientId, findByFreelancerId, findByRating, findByAppointmentId } = require("../controller/review_controller");
const reviewValidation = require("../validation/review_validation");
const { authenticateToken } = require("../security/auth");
const { authorizeRole } = require("../security/auth");

router.get("/", authenticateToken, findAll);
router.post("/", reviewValidation, authenticateToken, authorizeRole("client"), save);
router.get("/:id", authenticateToken, authorizeRole("admin"), findById);
router.get("/appointment/:appointment_id", authenticateToken, findByAppointmentId);
router.get("/client/:client_id", authenticateToken, authorizeRole("admin", "client"), findByClientId);
router.get("/freelancer/:freelancer_id", findByFreelancerId);
router.get("/rating/:rating", findByRating);
router.delete("/:id", authenticateToken, authorizeRole("client"), deleteById);
router.put("/:id", authenticateToken, authorizeRole("client"), update)

module.exports = router;