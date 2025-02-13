const express = require("express")
const router = express.Router();
const {getNotificationsByClientId, getNotificationsByFreelancerId, markNotificationAsRead} = require("../controller/notification_controller");
const {authenticateToken} = require("../security/auth");
const {authorizeRole} = require("../security/auth");

router.get("/client/:client_id", authenticateToken, authorizeRole("client"), getNotificationsByClientId);
router.get("/freelancer/:freelancer_id", authenticateToken, authorizeRole("freelancer"), getNotificationsByFreelancerId);
router.put("/:id/read", authenticateToken, markNotificationAsRead);

module.exports = router;