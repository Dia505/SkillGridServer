const express = require("express")
const router = express.Router();
const {findAll, save, findById, findByFreelancerId, deleteById, update} = require("../controller/freelancer_service_controller");
const freelancerServiceValidation = require("../validation/freelancer_service_validation")

router.get("/", findAll);
router.post("/", freelancerServiceValidation, save);
router.get("/:id", findById);
router.get("/freelancer/:freelancer_id", findByFreelancerId);
router.delete("/:id", deleteById);
router.put("/:id", update);

module.exports = router;