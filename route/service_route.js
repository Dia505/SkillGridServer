const express = require("express")
const router = express.Router();
const { findAll, save, findById, deleteById, update } = require("../controller/service_controller");
const { authenticateToken } = require("../security/auth");
const { authorizeRole } = require("../security/auth");

router.get("/", authenticateToken, authorizeRole("admin"), findAll);
router.post("/", authenticateToken, authorizeRole("freelancer"), save);
router.get("/:id", authenticateToken, authorizeRole("admin"), findById);
router.delete("/:id", authenticateToken, authorizeRole("freelancer"), deleteById);
router.put("/:id", authenticateToken, authorizeRole("freelancer"), update)

module.exports = router;