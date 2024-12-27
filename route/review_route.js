const express = require("express")
const router = express.Router();
const {findAll, save, findById, deleteById, update, findByClientId, findByFreelancerId} = require("../controller/review_controller");
const reviewValidation = require("../validation/review_validation");
const {authenticateToken} = require("../security/auth");
const {authorizeRole} = require("../security/auth");

router.get("/", authenticateToken, authorizeRole("admin"), findAll);
router.post("/", reviewValidation, authenticateToken, authorizeRole("client"), save);
router.get("/:id", authenticateToken, authorizeRole("admin"), findById);
router.get("/:id/client", authenticateToken, authorizeRole("admin","client"), findByClientId);
router.get("/:id/freelancer", authenticateToken, authorizeRole("admin","client","freelancer"), findByFreelancerId);
router.delete("/:id", authenticateToken, authorizeRole("client"), deleteById);
router.put("/:id", authenticateToken, authorizeRole("client"), update)

module.exports = router;