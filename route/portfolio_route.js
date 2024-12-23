const express = require("express")
const router = express.Router();
const {findAll, save, findById, findByFreelancerServiceId, deleteById, update} = require("../controller/portfolio_controller");
const portfolioValidation = require("../validation/portfolio_validation");
const {authenticateToken} = require("../security/auth");

const multer = require("multer")
const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, "service_portfolio_images")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({storage})

router.get("/", authenticateToken, findAll);
router.post("/", portfolioValidation, upload.single("file_path"), save);
router.get("/:id", authenticateToken, findById);
router.get("/freelancer-service/:freelancer_service_id", findByFreelancerServiceId);
router.delete("/:id", deleteById);
router.put("/:id", upload.single("file_path"), update)

module.exports = router;