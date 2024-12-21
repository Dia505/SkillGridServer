const express = require("express")
const router = express.Router();
const {findAll, save, findById, findByAppointmentId, deleteById, update} = require("../controller/payment_controller");

router.get("/", findAll);
router.post("/", save);
router.get("/:id", findById);
router.get("/appointment/:appointment_id", findByAppointmentId);
router.delete("/:id", deleteById);
router.put("/:id", update);

module.exports = router;