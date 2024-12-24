const express = require("express")
const router = express.Router();
const {findAll, save, findById, deleteById, update} = require("../controller/service_controller");
const {authenticateToken} = require("../security/auth");

router.get("/", authenticateToken, findAll);
router.post("/", save);
router.get("/:id", authenticateToken, findById);
router.delete("/:id", authenticateToken, deleteById);
router.put("/:id", authenticateToken, update)

module.exports = router;