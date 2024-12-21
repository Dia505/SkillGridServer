const express = require("express")
const router = express.Router();
const {findAll, save, findById, deleteById, update, findByClientId, findByFreelancerId} = require("../controller/review_controller");

router.get("/", findAll);
router.post("/", save);
router.get("/:id", findById);
router.get("/:id/client", findByClientId);
router.get("/:id/freelancer", findByFreelancerId);
router.delete("/:id", deleteById);
router.put("/:id", update)

module.exports = router;