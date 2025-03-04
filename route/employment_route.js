const express = require("express")
const router = express.Router();
const { findAll, save, findById, findByFreelancerId, deleteById, update } = require("../controller/employment_controller");
const employmentValidation = require("../validation/employment_validation");
const {authenticateToken} = require("../security/auth");
const {authorizeRole} = require("../security/auth");

router.get("/", authenticateToken, authorizeRole("admin"), findAll);
router.post("/", authenticateToken, authorizeRole("freelancer"), employmentValidation, save);
router.get("/:id", authenticateToken, findById);
router.get("/freelancer/:freelancer_id", authenticateToken, findByFreelancerId);
router.delete("/:id", authenticateToken, authorizeRole("freelancer"), deleteById);
router.put("/:id", authenticateToken, authorizeRole("freelancer"), update);

module.exports = router;