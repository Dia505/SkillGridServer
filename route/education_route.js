const express = require("express")
const router = express.Router();
const {findAll, save, findById, findByFreelancerId, deleteById, update} = require("../controller/education_controller");
const educationValidation = require("../validation/education_validation");
const {authenticateToken} = require("../security/auth");

router.get("/", authenticateToken, findAll);
router.post("/", educationValidation, save);
router.get("/:id", authenticateToken, findById);
router.get("/freelancer/:freelancer_id", findByFreelancerId);
router.delete("/:id", deleteById);
router.put("/:id", update);

module.exports = router;