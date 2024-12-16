const express = require("express")
const router = express.Router();
const {findAll, save, findById, findByClientId, findByFreelancerId, deleteById, update} = require("../controller/review_controller");

router.get("/", findAll);
router.post("/", save);
router.get("/:id", findById);
router.get("/freelancer/:freelancer_id", findByFreelancerId);
router.get("/client/:client_id", findByClientId);
router.delete("/:id", deleteById);
router.put("/:id", update)

module.exports = router;