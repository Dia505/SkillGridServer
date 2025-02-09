const express = require("express")
const { findAll, save, findById, searchFreelancers, findByJobCategory, deleteById, update, updateProfilePicture, updateBgPicture } = require("../controller/freelancer_controller");
const router = express.Router();
const multer = require("multer");
const { freelancerRegistrationValidation } = require('../validation/freelancer_validation');
const { authenticateToken } = require("../security/auth");
const { authorizeRole } = require("../security/auth");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "freelancer_images"); // Common folder for images
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Save file with its original name
    }
});

const upload = multer({ storage });

// Specify fields for file uploads
const uploadFields = upload.fields([
    { name: "profile_picture", maxCount: 1 },
    { name: "background_picture", maxCount: 1 }
]);
router.get("/", authenticateToken, authorizeRole("admin"), findAll);
router.post("/", freelancerRegistrationValidation, uploadFields, save);
router.get("/:id", authenticateToken, findById);
router.get("/search/:searchQuery", searchFreelancers);
router.delete("/:id", authenticateToken, authorizeRole("freelancer"), deleteById);
router.put("/:id", authenticateToken, authorizeRole("freelancer"), update)
router.put("/:id/profile-picture", authenticateToken, authorizeRole("freelancer"), upload.single("profile_picture"), updateProfilePicture);
router.put("/:id/background-picture", authenticateToken, authorizeRole("freelancer"), upload.single("background_picture"), updateBgPicture)

module.exports = router;