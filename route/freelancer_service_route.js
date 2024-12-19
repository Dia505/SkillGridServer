const express = require("express")
const router = express.Router();
const {findAll, save, findById, findByFreelancerId, deleteById, update} = require("../controller/freelancer_service_controller");

router.get("/", findAll);
router.post("/", save);
router.get("/:id", findById);
router.get("/freelancer/:freelancer_id", findByFreelancerId);
router.delete("/:id", deleteById);
router.put("/:id", update);

module.exports = router;