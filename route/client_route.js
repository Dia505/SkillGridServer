const express = require("express")
const router = express.Router();
const {findAll, save, findById, deleteById, update, updateProfilePicture} = require("../controller/client_controller");
const clientValidation = require("../validation/client_validation")

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, "client_images")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({storage})

router.get("/", findAll);
router.post("/", clientValidation, upload.single("profile_picture"), save);
router.get("/:id", findById);
router.delete("/:id", deleteById);
router.put("/:id", update);
router.put("/:id/profile-picture", upload.single("profile_picture"), updateProfilePicture);

module.exports = router;