const express = require("express")
const router = express.Router();
const { findAll, save, findById, deleteById, update, updateProfilePicture, uploadProfilePicture } = require("../controller/client_controller");
const clientValidation = require("../validation/client_validation")
const { authenticateToken } = require("../security/auth")
const { authorizeRole } = require("../security/auth");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "client_images")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({ storage })

router.get("/", authenticateToken, authorizeRole("admin"), findAll);
router.post("/", clientValidation, upload.single("profile_picture"), save);
router.get("/:id", authenticateToken, authorizeRole("client"), findById);
router.delete("/:id", authenticateToken, authorizeRole("client"), deleteById);
router.put("/:id", authenticateToken, authorizeRole("client"), update);
router.put("/:id/profile-picture", upload.single("profile_picture"), updateProfilePicture);
router.post("/uploadProfilePicture", upload.single("profile_picture"), uploadProfilePicture);

module.exports = router;