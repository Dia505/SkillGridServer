const express = require("express")
const router = express.Router();
const { findAll, save, findById, findByFreelancerId, deleteById, update } = require("../controller/employment_controller");
const employmentValidation = require("../validation/employment_validation");

router.get("/", findAll);
router.post("/", employmentValidation, save);
router.get("/:id", findById);
router.get("/freelancer/:freelancer_id", findByFreelancerId);
router.delete("/:id", deleteById);
router.put("/:id", update);

module.exports = router;