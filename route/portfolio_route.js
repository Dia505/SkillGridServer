const express = require("express")
const router = express.Router();
const { findAll, save, findById, findByFreelancerServiceId, findByFreelancerId, deleteById, update } = require("../controller/portfolio_controller");
const portfolioValidation = require("../validation/portfolio_validation");
const { authenticateToken } = require("../security/auth");
const { authorizeRole } = require("../security/auth");

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "service_portfolio_images"); // Folder for storing uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});
const upload = multer({ storage });

router.get("/", authenticateToken, authorizeRole("admin"), findAll);
router.post("/", portfolioValidation, upload.array("file_path"), authenticateToken, authorizeRole("freelancer"), save);
router.get("/:id", authenticateToken, authenticateToken, authorizeRole("admin"), findById);
router.get("/freelancer-service/:freelancer_service_id", findByFreelancerServiceId);
router.get("/freelancer/:freelancer_id", findByFreelancerId);
router.delete("/:id", authenticateToken, authorizeRole("freelancer"), deleteById);
router.put("/:id", upload.single("file_path"), authenticateToken, authorizeRole("freelancer"), update)

module.exports = router;