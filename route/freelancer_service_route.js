const express = require("express")
const router = express.Router();
const {findAll, save, findById, findByFreelancerId, deleteById, update} = require("../controller/freelancer_service_controller");
const freelancerServiceValidation = require("../validation/freelancer_service_validation");
const {authenticateToken} = require("../security/auth");
const {authorizeRole} = require("../security/auth");

router.get("/", authenticateToken, authorizeRole("admin"), findAll);
router.post("/", freelancerServiceValidation, authenticateToken, authorizeRole("freelancer"), save);
router.get("/:id", authenticateToken, findById);
router.get("/freelancer/:freelancer_id", findByFreelancerId);
router.delete("/:id", authenticateToken, authorizeRole("freelancer"), deleteById);
router.put("/:id", authenticateToken, authorizeRole("freelancer"), update);

module.exports = router;