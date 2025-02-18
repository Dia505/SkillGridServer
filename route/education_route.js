const express = require("express")
const router = express.Router();
const { findAll, save, findById, findByFreelancerId, deleteById, update } = require("../controller/education_controller");
const educationValidation = require("../validation/education_validation");
const { authenticateToken } = require("../security/auth");
const { authorizeRole } = require("../security/auth");

router.get("/", authenticateToken, authorizeRole("admin"), findAll);
router.post("/", educationValidation, save);
router.get("/:id", authenticateToken, authorizeRole("admin"), findById);
router.get("/freelancer/:freelancer_id", authenticateToken, findByFreelancerId);
router.delete("/:id", authenticateToken, authorizeRole("freelancer"), deleteById);
router.put("/:id", authenticateToken, authorizeRole("freelancer"), update);

module.exports = router;